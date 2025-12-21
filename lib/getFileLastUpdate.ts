import { fileURLToPath } from 'url';

export default function getFileLastUpdateDate(filePath: string) {
  let __filename = fileURLToPath(filePath);
  if (__filename.endsWith('page.mdx.tsx')) {
    __filename = __filename.replace('.mdx.tsx', '.mdx');
  }

  const isoDate = Bun.spawnSync([
    'git',
    'log',
    '-1',
    '--format=%cs',
    '--',
    __filename,
  ])
    .stdout.toString()
    .trim();

  const date = new Date(isoDate);
  const formatted = date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  return formatted;
}
