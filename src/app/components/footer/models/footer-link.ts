export class FooterLink {
  title: string;
  href: string;
  label?: string | any;
  isInternal?: boolean;
  isBlank?: boolean;

  constructor(title: string, href: string, label?: string | any, isInternal: boolean = true, isBlank: boolean = true) {
    this.title = title;
    this.href = href;
    this.label = label;
    this.isInternal = isInternal;
    this.isBlank = isBlank;
  }
}
