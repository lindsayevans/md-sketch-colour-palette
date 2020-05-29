import { promises as fs } from 'fs';
import { parse as parseXml } from 'fast-xml-parser';

import { Palette } from './Palette';

export class AndroidXmlParser {
  async parseResourceXml(filename: string): Promise<Palette[]> {
    const xml = await fs.readFile(filename);
    const rawColours = parseXml(xml.toString(), {
      ignoreAttributes: false,
    });

    const palettes: Palette[] = [];

    // resources:Object {color: Array(112)}
    //     color:Array(112) [Object, Object, Object, …]
    //         0:
    //             @_name:"primary_50"
    //             #text:"#e2e8ed"

    rawColours.resources.color.forEach((colour) => {
      const [paletteId, colourId] = colour['@_name'].split('_');
      let palette = palettes.find((p) => p.name === paletteId);
      if (palette === undefined) {
        palettes.push({ name: paletteId, colours: [] });
        palette = palettes.find((p) => p.name === paletteId);
      }
      palette.colours.push({
        id: colourId,
        hex: colour['#text'],
      });
    });

    return palettes;
  }
}
