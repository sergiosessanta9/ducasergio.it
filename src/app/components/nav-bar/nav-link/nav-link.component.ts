import {Component, Input} from '@angular/core';

@Component({
  selector: 'nav-link',
  templateUrl: './nav-link.component.html',
})
export class NavLinkComponent {
  @Input() href!: string;
  @Input() title!: string;
}
