import { Sketch, Page, SymbolMaster, Text } from 'sketch-constructor';
import { titleCase } from 'title-case';

import { Palette } from './Palette';
import { ColourSymbol } from './ColourSymbol';

export class PaletteSymbol {
  constructor(document: Sketch, page: Page, palette: Palette, i: number) {
    // Palette symbol
    const headingHeight = 32;
    const paletteHeight = 50 * palette.colours.length + headingHeight;
    let paletteSymbol = new SymbolMaster({
      name: `Colours/${titleCase(palette.name)}`,
      frame: {
        width: 200,
        height: paletteHeight,
        x: i * 300,
        y: 0,
      },
    });
    const pText = new Text({
      name: 'Palette Name',
      string: titleCase(palette.name),
      color: '#666',
      fontSize: 20,
      frame: { width: 200, height: headingHeight, x: 0, y: 0 },
    });
    paletteSymbol.addLayer(pText);
    paletteSymbol.allowsOverrides = false;
    page.addArtboard(paletteSymbol);
    palette.colours.forEach((colour, ii) => {
      new ColourSymbol(
        document,
        page,
        palette,
        colour,
        paletteSymbol,
        paletteHeight,
        headingHeight,
        i,
        ii
      );
    });
  }
}
