import fs from 'fs';
import path from 'path';
import { cruise } from 'dependency-cruiser';
import extractTSConfig from 'dependency-cruiser/config-utl/extract-ts-config';

const DMDG_BLOCK_BEGIN = '<!-- DMDG BEGIN -->';
const DMDG_BLOCK_END = '<!-- DMDG END -->';

interface CruiseOption {
  maxDepth?: number;
  tsConfig?: string;
}

export function drawDependencyGraph(entryDir: string, option: CruiseOption) {
  const result = cruise(
    [entryDir],
    {
      outputType: 'mermaid',
      maxDepth: option.maxDepth ?? 5,
      doNotFollow: {
        path: 'node_modules',
      },
      collapse: '^node_modules/[^/]+',
      focus: entryDir.replace('./', ''),
      baseDir: process.cwd(),
      ruleSet: {
        // Without this setting, path aliases will not be resolved.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        options: { tsConfig: { fileName: option.tsConfig } },
      },
    },
    undefined,
    option.tsConfig && extractTSConfig(option.tsConfig)
  );

  const output = `${DMDG_BLOCK_BEGIN}
\`\`\`mermaid
${result.output}
\`\`\`
${DMDG_BLOCK_END}`;

  putGraph(output, entryDir);
}

function putGraph(output: string, entryDir: string) {
  const mdFilePath = path.resolve(entryDir, 'README.md');

  if (fs.existsSync(mdFilePath)) {
    const mdFileData = fs.readFileSync(mdFilePath, 'utf-8');

    const newMdFileData = mdFileData.replace(
      new RegExp(`${DMDG_BLOCK_BEGIN}[\\S\\s.]*${DMDG_BLOCK_END}`, 'gm'),
      output
    );

    fs.writeFileSync(mdFilePath, newMdFileData);
  } else {
    fs.writeFileSync(mdFilePath, output);
  }
}
