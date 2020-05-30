import {
  Sketch,
  Page,
  SymbolMaster,
  Rectangle,
  SharedStyle,
  Text,
} from 'sketch-constructor';
import { titleCase } from 'title-case';
import * as contrast from 'contrast';

import { Palette } from './Palette';
import { Colour } from './Colour';

export class ColourSymbol {
  constructor(
    document: Sketch,
    page: Page,
    palette: Palette,
    colour: Colour,
    paletteSymbol: SymbolMaster,
    paletteHeight: number,
    headingHeight: number,
    i: number,
    ii: number
  ) {
    // Fill style
    const layerStyle = SharedStyle.LayerStyle({
      name: `Colours/${titleCase(palette.name)}/${colour.id}`,
      fills: [
        {
          color: colour.hex,
        },
      ],
    });
    document.addLayerStyle(layerStyle);
    // Colour chip symbol
    let chipSym = new SymbolMaster({
      name: `Colours/${titleCase(palette.name)}/${colour.id}`,
      frame: {
        width: 200,
        height: 50,
        x: i * 300,
        y: paletteHeight + (headingHeight + ii * 100),
      },
    });
    let r = new Rectangle({
      name: 'Background',
      x: 0,
      y: 0,
      width: 200,
      height: 50,
    });
    r.setSharedStyle(layerStyle);
    chipSym.addLayer(r);
    const textColour = contrast(colour.hex) === 'light' ? '#1a1a1a' : '#f4f4f4';
    const text = new Text({
      name: 'ID',
      string: colour.id,
      color: textColour,
      fontName: 'Helvetica',
      fontSize: 24,
      verticalAlignment: 'center',
      frame: { width: 50, height: 24, x: 16, y: 11 },
    });
    chipSym.addLayer(text);
    const hex = new Text({
      name: 'Hex',
      string: colour.hex,
      color: textColour,
      fontName: 'Monaco',
      fontSize: 16,
      alignment: 'right',
      verticalAlignment: 'center',
      frame: { width: 90, height: 24, x: 100, y: 18 },
    });
    chipSym.addLayer(hex);
    chipSym.allowsOverrides = false;
    page.addArtboard(chipSym);
    const chip = chipSym.createInstance({});
    chip.frame.x = 0;
    (chip.frame.y = headingHeight + ii * 50), paletteSymbol.addLayer(chip);
  }
}
