import {Component, Input} from '@angular/core';
import {FooterGroup} from "../models/footer-group";

@Component({
  selector: 'footer-group',
  templateUrl: './footer-group.component.html',
})
export class FooterGroupComponent {
  @Input() group?: FooterGroup;
}
