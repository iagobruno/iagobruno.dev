import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

export default function getFileLastUpdateDate(filePath: string) {
  const __filename = fileURLToPath(filePath);
  const isoDate = execSync(`git log -1 --format="%cs" -- "${__filename}"`)
    .toString()
    .trim();

  const date = new Date(isoDate);
  const formatted = date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  return formatted;
}
