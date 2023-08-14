export class Word {
  text: string;
  lines: boolean[] | any;
  caret: boolean;

  constructor(text: string, lines: boolean[] | any= null, caret: boolean = false) {
    this.text = text;
    this.lines = lines;
    this.caret = caret;
  }
}
