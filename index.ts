import {
  Sketch,
  Page,
  SymbolMaster,
  Rectangle,
  SharedStyle,
  Text,
} from 'sketch-constructor';

import { AndroidXmlParser } from './AndroidXmlParser';

const parser = new AndroidXmlParser();

(async () => {
  const palettes = await parser.parseResourceXml('./example.xml');

  const newSketch = new Sketch();

  // Create layer fill styles
  const layerStyle = SharedStyle.LayerStyle({
    name: '__TMP',
    fills: [
      {
        color: '#007EB6',
      },
    ],
  });
  newSketch.addLayerStyle(layerStyle);

  // Create symbols
  const symbolsPage = new Page({
    name: 'Symbols',
  });
  newSketch.addPage(symbolsPage);

  let chipSym = new SymbolMaster({
    name: 'MD Colour',
    frame: { width: 200, height: 50 },
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

  // TODO: Contrasting text colours (via text styles?)
  const text = new Text({
    name: 'ID',
    string: 'A700',
    color: '#fff',
    fontSize: 18,
    frame: { width: 50, height: 24, x: 16, y: 13 },
  });
  chipSym.addLayer(text);

  const hex = new Text({
    name: 'Hex',
    string: '#000000',
    color: '#fff',
    fontSize: 16,
    frame: { width: 42, height: 24, x: 58, y: 14 },
  });
  chipSym.addLayer(hex);

  chipSym.allowsOverrides = true;
  symbolsPage.addArtboard(chipSym);

  // Create example chips

  const examplesPage = new Page({
    name: 'Examples',
  });

  newSketch.addPage(examplesPage);

  palettes.forEach((p, i) => {
    const pText = new Text({
      name: 'Palette Name',
      string: p.name,
      color: '#666',
      fontSize: 20,
      frame: { width: 200, height: 24, x: i * 300, y: 0 },
    });
    examplesPage.addLayer(pText);

    p.colours.forEach((c, ii) => {
      const layerStyle = SharedStyle.LayerStyle({
        name: `Colours/${p.name}/${c.id}`,
        fills: [
          {
            color: c.hex,
          },
        ],
      });
      newSketch.addLayerStyle(layerStyle);

      let chipInstance = chipSym.createInstance({
        name: `Colour Chips/${p.name}/${c.id}`,
        frame: { width: 200, height: 50, x: i * 300, y: 24 + ii * 50 },
        overrideValues: [
          {
            name: 'ID',
            value: c.id,
          },
          {
            name: 'Hex',
            value: c.hex,
          },
          {
            name: 'Background',
            value: layerStyle,
          },
        ],
      });

      // Workaround for bug in sketch-constructor that frame position isn't picked up from createInstance()
      chipInstance.frame.x = i * 300;
      chipInstance.frame.y = 24 + ii * 50;

      examplesPage.addLayer(chipInstance);
      // TODO: Add as symbols - palette, chips
    });
  });

  newSketch.build('palette.sketch', 0);
})();
