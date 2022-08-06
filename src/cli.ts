import cac from 'cac';
import { drawDependencyGraph } from './drawer';

const cli = cac();

cli
  .command(
    'draw [...dirs]',
    'Draw a module dependency graph for each directory'
  )
  .action(async (dirs: string[]) => {
    for (const dir of dirs) {
      drawDependencyGraph(dir);
    }
  });

cli.help();
cli.parse();
