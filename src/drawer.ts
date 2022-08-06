import fs from 'fs';
import path from 'path';
import { cruise } from 'dependency-cruiser';

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
      exclude: ['node_modules'],
      outputType: 'mermaid',
      maxDepth: option.maxDepth ?? 5,
    },
    undefined,
    option.tsConfig
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
