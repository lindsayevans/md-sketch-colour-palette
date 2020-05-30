# Material Design colour palette generator for Sketch

Builds a Sketch file containing symbols & layer styles based on a Material Design colour palette file.

[Example output](https://www.sketch.com/s/25b84e44-64c4-4527-92aa-e77bf4c16990) generated from [this palette](http://mcg.mbitson.com/#!?red=%23f44336&pink=%23e91e63&purple=%239c27b0&deeppurple=%23673ab7&indigo=%233f51b5&blue=%232196f3&lightblue=%2303a9f4&cyan=%2300bcd4&teal=%23009688&green=%234caf50&lightgreen=%238bc34a&lime=%23cddc39&yellow=%23ffeb3b&amber=%23ffc107&orange=%23ff9800&deeporange=%23ff5722&brown=%23795548&grey=%239e9e9e&bluegrey=%23607d8b&themename=Sketch%20palette%20generator%20test).

## ⚠️ Work In Progress ⚠️

This project is currently in the early stages of development, so things will most likely change frequently.

## System requirements

- [Node.js](https://nodejs.org/) - tested with v12 & v14

## Running

1. Create a colour palette using the [Material Design Palette Generator](http://mcg.mbitson.com/)
2. Export as **Android XML**, save to `colours.xml`
3. Run: `npm start`
4. Open `colours.sketch`

## TODO

- Proper CLI
- Support other input & output formats
- More flexible palette name/colour ID detection
- GUI (Sketch plugin? Desktop app?)
