# Material Design colour palette generator for Sketch

[![NPM package](https://img.shields.io/npm/v/mat-sketch-palette?style=flat-square)](https://www.npmjs.com/package/mat-sketch-palette)

Builds a Sketch file containing symbols & layer styles based on a Material Design colour palette file.

[Example output](https://www.sketch.com/s/25b84e44-64c4-4527-92aa-e77bf4c16990) generated from [this palette](http://mcg.mbitson.com/#!?red=%23f44336&pink=%23e91e63&purple=%239c27b0&deeppurple=%23673ab7&indigo=%233f51b5&blue=%232196f3&lightblue=%2303a9f4&cyan=%2300bcd4&teal=%23009688&green=%234caf50&lightgreen=%238bc34a&lime=%23cddc39&yellow=%23ffeb3b&amber=%23ffc107&orange=%23ff9800&deeporange=%23ff5722&brown=%23795548&grey=%239e9e9e&bluegrey=%23607d8b&themename=Sketch%20palette%20generator%20test).

## System requirements

- [Node.js](https://nodejs.org/) - tested with v12 & v14

## Usage

1. Create a colour palette using the [Material Design Palette Generator](http://mcg.mbitson.com/)
2. Export as **Android XML**, save to `colours.xml`
3. Run `npx mat-sketch-palette`
4. Colour palettes will be generated in `colours.sketch`

## Command line options

```sh
npx mat-sketch-palette [options]
```

| Option            | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| --input=filename  | The input file<br>Default: colours.xml<br>Alias: -i                |
| --output=filename | The output file<br>Default: colours.sketch<br>Alias: -o            |
| --quiet           | Don't print anything to the console<br>Default: false<br>Alias: -q |

## What it does

### Create symbols & styles

- Each colour will have a symbol created with it's name & hex code, plus a background fill using the colour.
- Each colour will also have layer style created using the colour as a fill.
- Each palette will have a symbol created using the all of the colour symbols it contains.

### Naming

For each colour we split the name on the underscore character, then use the first part as the palette name and the second as the colour name.

Symbols:

- `Colours/[Palette Name]`
- `Colours/[Palette Name]/[Colour Name]`

Styles:

- `Colours/[Palette Name]/[Colour Name]`

## TODO

- Support other input & output formats
- More flexible palette name/colour ID detection
- GUI (Sketch plugin? Desktop app?)
