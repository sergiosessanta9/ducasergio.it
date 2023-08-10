export class FooterLink {
  title: string;
  href: string;
  label?: string | any;
  isInternal?: boolean;

  constructor(title: string, href: string, label?: string | any, isInternal: boolean = true) {
    this.title = title;
    this.href = href;
    this.label = label;
    this.isInternal = isInternal;
  }
}
