import {FooterLink} from "./footer-link";

export class FooterGroup {
  title: string;
  links: FooterLink[];

  constructor(title: string, links: FooterLink[]) {
    this.title = title;
    this.links = links;
  }
}
