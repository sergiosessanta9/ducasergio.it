import {Component, Input} from '@angular/core';
import {NavLink} from "../models/NavLink";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'nav-icon-link',
  templateUrl: './nav-icon-link.component.html',
})
export class NavIconLinkComponent {
  @Input() link?: NavLink;
  @Input() label?: string;
}
