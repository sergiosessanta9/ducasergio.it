import {Component, Input} from '@angular/core';
import {FooterLink} from "../models/footer-link";
import {Icons} from "../../shared/icons";

@Component({
  selector: 'footer-link',
  templateUrl: './footer-link.component.html',
})
export class FooterLinkComponent {
  @Input() link?: FooterLink;
  protected readonly Icons = Icons;
}
