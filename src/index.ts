import { Sketch, Page } from 'sketch-constructor';

import { AndroidXmlParser } from './AndroidXmlParser';
import { PaletteSymbol } from './PaletteSymbol';

// TODO: Support other types
const parser = new AndroidXmlParser();

(async () => {
  const palettes = await parser.parseResourceXml('./colours.xml');

  const document = new Sketch();

  const page = new Page({
    name: 'Colour Palettes',
  });

  document.addPage(page);

  palettes.forEach((palette, i) => {
    new PaletteSymbol(document, page, palette, i);
  });

  document.build('colours.sketch', 0);
})();
