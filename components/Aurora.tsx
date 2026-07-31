import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uVerticalOffset;
uniform float uFlutedLineWidth;
uniform float uFlutedDistortion;
uniform float uFlutedOpacity;
uniform float uFlutedFade;
uniform float uFlutedEnabled;
uniform float uFlutedTopMargin;
uniform float uNoiseIntensity;
uniform float uFlutedChromaticAberration;

out vec4 fragColor;

float grainNoise(vec2 texCoord) {
  vec2 r = 2.718281828459045 * sin(2.718281828459045 * texCoord);
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // Fluted glass – Paper-style prism distortion
  float patternSize = uFlutedLineWidth * 25.0 + 3.0;
  vec2 gridUv = uv * patternSize;
  float x = fract(gridUv.x);
  float xNonSmooth = x + 0.0001;

  float aa = max(fwidth(gridUv.x), 0.0001) * max(uFlutedFade, 0.0001);
  float fadeX = smoothstep(0., aa, xNonSmooth) * (1.0 - smoothstep(1. - aa, 1., xNonSmooth));

  // Top fade
  float topEdge = 1.0 - uFlutedTopMargin / uResolution.y;
  float topFade = 1.0 - smoothstep(topEdge, 1.0, uv.y);

  float distortion = -pow(1.5 * (x - 0.5), 3.);
  distortion *= 3. * uFlutedDistortion;
  distortion *= fadeX;

  vec2 distortedUv = uv;
  distortedUv.x += distortion / patternSize * uFlutedEnabled * topFade;
  float verticalDist = pow(1.0 - x, 2.0) * uFlutedDistortion * 0.06 * fadeX;
  distortedUv.y += verticalDist * uFlutedEnabled * topFade;
  distortedUv = mix(uv, distortedUv, uFlutedEnabled * topFade);

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, distortedUv.x, rampColor);

  float height = snoise(vec2(distortedUv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (distortedUv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20 - uVerticalOffset;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  // Chromatic aberration – only at aurora wave tips/edges
  float caShift = uFlutedChromaticAberration * 0.02;
  float auroraEdge = fwidth(auroraAlpha) * 8.0;
  float caMask = clamp(auroraEdge, 0.0, 1.0);
  vec3 caRampR, caRampG, caRampB;
  COLOR_RAMP(colors, distortedUv.x + caShift, caRampR);
  COLOR_RAMP(colors, distortedUv.x, caRampG);
  COLOR_RAMP(colors, distortedUv.x - caShift, caRampB);
  vec3 caColor = vec3(caRampR.r, caRampG.g, caRampB.b);
  rampColor = mix(rampColor, caColor, caMask);

  // Fluted glass overlay – shadow gradient + boundary highlights
  float shadow = pow(x, 1.3);
  float shadowStrength = shadow * uFlutedDistortion * 0.35 * uFlutedOpacity * uFlutedEnabled * topFade;

  float highlightWidth = max(0.001, fwidth(gridUv.x));
  float highlight = smoothstep(0., highlightWidth, xNonSmooth) * smoothstep(1., 1. - highlightWidth, xNonSmooth);
  highlight = 1. - highlight;
  float highlightStrength = highlight * uFlutedDistortion * 0.3 * uFlutedOpacity * uFlutedEnabled * topFade;

  vec3 glassHighlight = vec3(0.9, 0.92, 1.0) * highlightStrength * auroraAlpha;

  vec3 finalColor = mix(rampColor * auroraAlpha, vec3(0.0), shadowStrength);
  finalColor += glassHighlight;

  // Grain overlay
  float grain = grainNoise(gl_FragCoord.xy);
  finalColor -= grain / 15.0 * uNoiseIntensity;

  fragColor = vec4(finalColor, auroraAlpha);
}
`;

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  time?: number;
  speed?: number;
  verticalOffset?: number;
  flutedLineWidth?: number;
  flutedDistortion?: number;
  flutedOpacity?: number;
  flutedFade?: number;
  flutedEnabled?: boolean;
  flutedTopMargin?: number;
  flutedChromaticAberration?: number;
  noiseIntensity?: number;
}

const DEFAULTS: AuroraProps = {
  // colorStops={['#F3D77D', '#A383CA', '#76C6AC']}
  // colorStops={['#5938ff', '#00bfff', '#00ffa2']}
  colorStops: ['#FFD230', '#AD46FF', '#46EDD5'],
  amplitude: 1.1,
  verticalOffset: 0.3,
  blend: 0.8,
  speed: 0.75,
  flutedEnabled: true,
  flutedLineWidth: 1, // 0.7 mobile e 1 no desktop
  flutedDistortion: 0.92,
  flutedOpacity: 0.11,
  flutedFade: 0,
  flutedTopMargin: 110,
  flutedChromaticAberration: 6,
  noiseIntensity: 0.45,
};

export default function Aurora(p: AuroraProps) {
  const props = {
    ...DEFAULTS,
    ...p,
  };

  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const heroHeight = document.querySelector('header.hero')?.getBoundingClientRect().height + 'px';
    ctn.style.minHeight = `max(${heroHeight}, 100dvh)`;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    let program: Program | undefined;

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener('resize', resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStopsArray = props.colorStops!.map((hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: props.amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: props.blend },
        uVerticalOffset: { value: props.verticalOffset },
        uFlutedLineWidth: { value: props.flutedLineWidth },
        uFlutedDistortion: { value: props.flutedDistortion },
        uFlutedOpacity: { value: props.flutedOpacity },
        uFlutedFade: { value: props.flutedFade },
        uFlutedEnabled: { value: props.flutedEnabled ? 1 : 0 },
        uFlutedTopMargin: { value: props.flutedTopMargin },
        uFlutedChromaticAberration: { value: props.flutedChromaticAberration },
        uNoiseIntensity: { value: props.noiseIntensity },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    gl.canvas.style.opacity = '0';
    gl.canvas.classList.add('mask-b-from-40%', 'mask-b-to-90%', 'not-dark:saturate-90');
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    const update = (t: number) => {
      animateId = requestAnimationFrame(update);
      const time = props.time !== undefined ? props.time : t * 0.01;
      const speed = props.speed !== undefined ? props.speed : 1.0;
      if (program) {
        program.uniforms.uTime.value = time * speed * 0.1;
        program.uniforms.uAmplitude.value = props.amplitude;
        program.uniforms.uBlend.value = props.blend;
        program.uniforms.uVerticalOffset.value = props.verticalOffset;
        program.uniforms.uFlutedLineWidth.value = props.flutedLineWidth;
        program.uniforms.uFlutedDistortion.value = props.flutedDistortion;
        program.uniforms.uFlutedOpacity.value = props.flutedOpacity;
        program.uniforms.uFlutedFade.value = props.flutedFade;
        program.uniforms.uFlutedEnabled.value = props.flutedEnabled ? 1 : 0;
        program.uniforms.uFlutedTopMargin.value = props.flutedTopMargin;
        program.uniforms.uNoiseIntensity.value = props.noiseIntensity;
        program.uniforms.uFlutedChromaticAberration.value = props.flutedChromaticAberration;
        program.uniforms.uColorStops.value = props.colorStops!.map((hex: string) => {
          const c = new Color(hex);
          return [c.r, c.g, c.b];
        });
        renderer.render({ scene: mesh });
      }
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [...Object.values(props)]);

  return (
    <div
      ref={ctnDom}
      className="aurora w-full min-h-svh absolute top-0 left-0 z-0 pointer-events-none bg-white dark:bg-neutral-950 srotate-180"
    />
  );
}
