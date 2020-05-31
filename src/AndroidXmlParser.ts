import { promises as fs } from 'fs';
import { parse } from 'fast-xml-parser';

import { Palette } from './Palette';

export class AndroidXmlParser {
  async parseResourceXml(filename: string): Promise<Palette[]> {
    const xml = await fs.readFile(filename);
    const rawColours = parse(xml.toString(), {
      ignoreAttributes: false,
    });

    const palettes: Palette[] = [];

    rawColours.resources.color.forEach((colour: { [key: string]: string }) => {
      const [paletteId, colourId] = colour['@_name'].split('_');
      let palette = palettes.find((p) => p.name === paletteId);
      if (palette === undefined) {
        palette = { name: paletteId, colours: [] };
        palettes.push(palette);
      }
      palette.colours.push({
        id: colourId,
        hex: colour['#text'],
      });
    });

    return palettes;
  }
}
