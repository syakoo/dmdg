import cac from 'cac';
import { drawDependencyGraph } from './drawer';

const cli = cac();

interface CLIOption {
  maxDepth?: number;
  tsConfig?: string;
}

cli
  .command(
    'draw [...dirs]',
    'Draw a module dependency graph for each directory'
  )
  .option('--maxDepth [maxDepth]', '[number] specified max depth')
  .option('--tsConfig [tsConfig]', '[string] use specified ts-config file')
  .action(async (dirs: string[], option: CLIOption) => {
    const resolvedOption = {
      maxDepth: option.maxDepth,
      tsConfig: option.tsConfig,
    };

    for (const dir of dirs) {
      drawDependencyGraph(dir, resolvedOption);
    }
  });

cli.help();
cli.parse();
