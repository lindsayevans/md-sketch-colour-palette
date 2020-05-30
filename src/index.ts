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

import { AndroidXmlParser } from './AndroidXmlParser';

// TODO: Support other types
const parser = new AndroidXmlParser();

(async () => {
  const palettes = await parser.parseResourceXml('./colours.xml');

  const newSketch = new Sketch();

  // Create example chips

  const page = new Page({
    name: 'Colour Chips',
  });

  newSketch.addPage(page);

  palettes.forEach((p, i) => {
    // Palette symbol
    const headingHeight = 32;
    const paletteHeight = 50 * p.colours.length + headingHeight;
    let pSym = new SymbolMaster({
      name: `Colours/${titleCase(p.name)}`,
      frame: {
        width: 200,
        height: paletteHeight,
        x: i * 300,
        y: 0,
      },
    });

    const pText = new Text({
      name: 'Palette Name',
      string: titleCase(p.name),
      color: '#666',
      fontSize: 20,
      frame: { width: 200, height: headingHeight, x: 0, y: 0 },
    });
    pSym.addLayer(pText);

    pSym.allowsOverrides = false;
    page.addArtboard(pSym);

    p.colours.forEach((c, ii) => {
      // Fill style
      const layerStyle = SharedStyle.LayerStyle({
        name: `Colours/${titleCase(p.name)}/${c.id}`,
        fills: [
          {
            color: c.hex,
          },
        ],
      });
      newSketch.addLayerStyle(layerStyle);

      // Colour chip symbol
      let chipSym = new SymbolMaster({
        name: `Colours/${titleCase(p.name)}/${c.id}`,
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

      const textColour = contrast(c.hex) === 'light' ? '#1a1a1a' : '#f4f4f4';

      const text = new Text({
        name: 'ID',
        string: c.id,
        color: textColour,
        fontName: 'Helvetica',
        fontSize: 24,
        verticalAlignment: 'center',
        frame: { width: 50, height: 24, x: 16, y: 11 },
      });
      chipSym.addLayer(text);

      const hex = new Text({
        name: 'Hex',
        string: c.hex,
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
      (chip.frame.y = headingHeight + ii * 50), pSym.addLayer(chip);
    });
  });

  newSketch.build('colours.sketch', 0);
})();
