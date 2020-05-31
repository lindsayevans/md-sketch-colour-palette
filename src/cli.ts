import arg from 'arg';
import chalk from 'chalk';

import { BuilderOptions, buildPalettes } from './buildPalettes';

const pkg = require('../package.json');

function parseArguments(rawArgs: string[]): BuilderOptions {
  let options: BuilderOptions = {
    input: 'colours.xml',
    output: 'colours.sketch',
    quiet: false,
  };

  const args = arg(
    {
      '--input': String,
      '--output': String,
      '--quiet': Boolean,
      '-i': '--input',
      '-o': '--output',
      '-q': '--quiet',
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  options = {
    input: args['--input'] || options.input,
    output: args['--output'] || options.output,
    quiet: args['--quiet'] || options.quiet,
  };

  return options;
}

const banner = `${chalk.bold.bgHex('#666').hex('#f00')(
  ' mat'
)}${chalk.bold.bgHex('#666').hex('#ccc')('-')}${chalk.bold
  .bgHex('#666')
  .hex('#f90')('sketch ')} v${pkg.version}`;

export async function main(argv: string[]) {
  try {
    const start = new Date().getTime();
    const options = parseArguments(argv);

    if (!options.quiet) {
      console.log(`${banner}

Input: ${options.input}
Output: ${options.output}
`);
    }

    const stats = await buildPalettes(options);
    const end = new Date().getTime();
    if (!options.quiet) {
      console.log(
        `Generated ${chalk.bold(stats.palettes)} palettes and ${chalk.bold(
          stats.colours
        )} colours in ${chalk.bold(end - start)}ms`
      );
    }
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
