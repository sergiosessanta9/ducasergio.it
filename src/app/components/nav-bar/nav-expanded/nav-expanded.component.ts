import {Component, Input} from '@angular/core';
import {NavLink} from "../models/NavLink";
import {Icons} from "../../shared/icons";

@Component({
  selector: 'nav-expanded',
  templateUrl: './nav-expanded.component.html',
})
export class NavExpandedComponent {
  @Input() title!: string;
  @Input() items!: NavLink[];
  protected readonly Icons = Icons;
}
