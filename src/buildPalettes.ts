import { Sketch, Page } from 'sketch-constructor';

import { AndroidXmlParser } from './AndroidXmlParser';
import { PaletteSymbol } from './PaletteSymbol';

export interface BuilderOptions {
  input: string;
  output: string;
  quiet: boolean;
}

export interface BuilderStatistics {
  palettes: number;
  colours: number;
}

export async function buildPalettes(
  options: BuilderOptions
): Promise<BuilderStatistics> {
  const parser = new AndroidXmlParser();

  const palettes = await parser.parseResourceXml(options.input);

  const document = new Sketch();

  const page = new Page({
    name: 'Colour Palettes',
  });

  document.addPage(page);

  palettes.forEach((palette, i) => {
    new PaletteSymbol(document, page, palette, i);
  });

  document.build(options.output, 0);

  return {
    palettes: palettes.length,
    colours: palettes.reduce(
      (total, palette) => total + palette.colours.length,
      0
    ),
  };
}
