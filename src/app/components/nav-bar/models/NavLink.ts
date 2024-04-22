import {SafeHtml} from "@angular/platform-browser";
import {Icons} from "../../shared/icons";

export class NavLink {
  href: string;
  title: string;
  icon?: Icons;

  constructor(title: string, href: string, icon?: Icons) {
    this.href = href;
    this.title = title;
    this.icon = icon;
  }
}
