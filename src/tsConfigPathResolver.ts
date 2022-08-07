import fs from 'fs';
import path from 'path';

export function resolveTsConfigPath(tsConfigPath?: string): string | undefined {
  const result = tsConfigPath ?? 'tsconfig.json';

  if (fs.existsSync(path.resolve(result))) {
    return result;
  }

  return undefined;
}
