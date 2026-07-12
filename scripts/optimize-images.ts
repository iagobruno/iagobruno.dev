import fs from 'node:fs/promises';
import path from 'node:path';
import sharp, { type AvifOptions, type WebpOptions, type ResizeOptions } from 'sharp';

const imagesDir = './public';
const excludeDirectories = ['icons'];
const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.webp'] as const;

const defaultOptions: ImageOptions = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 70,
  avifQuality: 55,
  webpQuality: 75,
  fit: 'inside',
  withoutEnlargement: true,
};

const specificImageOptions: Record<string, Partial<ImageOptions> | false> = {
  'favicon.png': false,
  'sign.png': false,
  'logo.png': false,
  'me.JPEG': {
    maxWidth: 600,
    maxHeight: 600,
  },
  'blurred-background.webp': {
    maxWidth: 2000,
    maxHeight: 2000,
  },
};

console.time('✔ Optimized all images');
walkImagesDir(imagesDir).then(() => {
  console.timeEnd(`✔ Optimized all images`);
});

async function walkImagesDir(directory: string) {
  if (excludeDirectories.includes(path.basename(directory))) return;

  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await walkImagesDir(filePath);
      continue;
    }

    const imageName = path.basename(filePath);
    const extension = path
      .extname(entry.name)
      .toLowerCase() as (typeof allowedImageExtensions)[number];

    if (!allowedImageExtensions.includes(extension) || specificImageOptions[imageName] === false) {
      continue;
    }

    const options: ImageOptions = {
      ...defaultOptions,
      ...specificImageOptions[imageName],
    };
    await optimizeImage(filePath, options);
  }
}

async function optimizeImage(filePath: string, options: ImageOptions) {
  const fileName = path.basename(filePath);
  const extension = path.extname(filePath).toLowerCase();

  const pipeline = sharp(filePath);
  const metadata = await pipeline.metadata();

  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;
  const needsResize = width > options.maxWidth || height > options.maxHeight;

  let output = pipeline;

  if (needsResize) {
    console.log(`Redimensionando ${fileName}...`);

    output = pipeline.resize({
      width: options.maxWidth,
      height: options.maxHeight,
      fit: options.fit,
      withoutEnlargement: options.withoutEnlargement,
    });

    let formatPipeline = output.clone();

    if (metadata.format === 'jpeg') {
      formatPipeline = formatPipeline.jpeg({
        quality: options.quality,
      });
    } //
    else if (metadata.format === 'png') {
      formatPipeline = formatPipeline.png({
        quality: Math.min(100, options.quality + 10),
        compressionLevel: 6,
      });
    } //
    else if (metadata.format === 'webp') {
      formatPipeline = formatPipeline.webp({
        quality: options.webpQuality ?? options.quality,
        effort: 5,
      });
    }

    const tempPath = filePath.replace(/(\.[^.]+)$/, '.tmp$1');
    await formatPipeline.toFile(tempPath);
    await fs.rename(tempPath, filePath);
  }

  // Convert to AVIF
  const avifOutputPath = filePath.replace(/\.[^.]+$/, '.avif');
  if (!(await fileExists(avifOutputPath))) {
    console.log(`Convertendo ${fileName} para .avif...`);
    await output
      .clone()
      .avif({
        quality: options.avifQuality,
        effort: 4,
      })
      .toFile(avifOutputPath);
  }

  // Convert to WebP
  // const webpOutputPath = filePath.replace(/\.[^.]+$/, '.webp');
  // if (!(await fileExists(webpOutputPath)) && extension !== '.webp') {
  //   await output
  //     .clone()
  //     .webp({
  //       quality: options.webpQuality,
  //       effort: 5,
  //     })
  //     .toFile(webpOutputPath);
  //   console.log(`Convertendo ${fileName} para .webp...`);
  // }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

interface ImageOptions {
  maxWidth: number;
  maxHeight: number;
  quality: NonNullable<AvifOptions['quality']> | NonNullable<WebpOptions['quality']>;
  avifQuality: ImageOptions['quality'];
  webpQuality: ImageOptions['quality'];
  fit: NonNullable<ResizeOptions['fit']>;
  withoutEnlargement: boolean;
}
