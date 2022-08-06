import fs from 'fs';
import path from 'path';
import { cruise } from 'dependency-cruiser';

export function drawDependencyGraph(entryDir: string) {
  const result = cruise([entryDir], {
    exclude: ['node_modules'],
    outputType: 'mermaid',
    maxDepth: 5,
  });

  const output = `
\`\`\`mermaid
${result.output}
\`\`\`
  `;

  putGraph(output, entryDir);
}

function putGraph(output: string, entryDir: string) {
  const mdFilePath = path.resolve(entryDir, 'README.md');

  if (fs.existsSync(mdFilePath)) {
    // TODO: implement
    // const mdFileData = fs.readFileSync(mdFilePath, 'utf-8');
  } else {
    fs.writeFileSync(mdFilePath, output);
  }
}
