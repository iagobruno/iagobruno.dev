import fs from 'node:fs/promises';
import path from 'node:path';
import sharp, { type AvifOptions, type ResizeOptions } from 'sharp';

const imagesDir = './public';

const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.webp'] as const;

const defaultOptions: ImageOptions = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 70,
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

let optimizedCount = 0;

async function resizeImage(filePath: string, options: ImageOptions) {
  const image = sharp(filePath);
  const metadata = await image.metadata();

  const tempPath = filePath.replace(/(\.[^.]+)$/, '.tmp$1');

  let pipeline = image.resize({
    width: options.maxWidth,
    height: options.maxHeight,
    fit: options.fit,
    withoutEnlargement: options.withoutEnlargement,
  });

  if (metadata.format === 'jpeg') {
    pipeline = pipeline.jpeg({
      quality: options.quality,
    });
  } else if (metadata.format === 'png') {
    pipeline = pipeline.png({
      quality: Math.min(100, options.quality + 10),
      compressionLevel: 6,
    });
  } else if (metadata.format === 'webp') {
    pipeline = pipeline.webp({
      quality: options.quality,
      effort: 6,
    });
  }

  await pipeline.toFile(tempPath);
  await fs.rename(tempPath, filePath);
}

async function convertToAvif(filePath: string, options: ImageOptions) {
  const outputPath = filePath.replace(/\.[^.]+$/, '.avif');

  await sharp(filePath)
    .avif({
      quality: options.quality,
      effort: 6,
    })
    .toFile(outputPath);
}

async function walk(directory: string) {
  if (directory === 'public/icons') return;

  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await walk(filePath);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();

    if (!allowedImageExtensions.includes(extension as (typeof allowedImageExtensions)[number])) {
      continue;
    }

    const imageName = path.basename(filePath);

    if (specificImageOptions[imageName] === false) {
      continue;
    }

    const options: ImageOptions = {
      ...defaultOptions,
      ...specificImageOptions[imageName],
    };

    const metadata = await sharp(filePath).metadata();
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;

    const needsResize = width > options.maxWidth || height > options.maxHeight;
    if (needsResize) {
      console.log(`✔ Redimensionando ${imageName}...`);

      await resizeImage(filePath, options);
    }

    const outputPath = filePath.replace(/\.[^.]+$/, '.avif');

    try {
      await fs.access(outputPath);
      continue;
    } catch {
      // File doesn't exist.
    }

    console.log(`✔ Convertendo ${imageName} para .avif...`);

    await convertToAvif(filePath, options);

    optimizedCount++;
  }
}

walk(imagesDir).then(() => {
  console.log(`\nOptimized ${optimizedCount} image(s).`);
});

interface ImageOptions {
  maxWidth: number;
  maxHeight: number;
  quality: NonNullable<AvifOptions['quality']>;
  fit: NonNullable<ResizeOptions['fit']>;
  withoutEnlargement: boolean;
}
