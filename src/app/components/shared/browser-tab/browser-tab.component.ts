import {Component, Input} from '@angular/core';
import {Icons} from "../icons";

@Component({
  selector: 'app-browser-tab',
  templateUrl: './browser-tab.component.html',
})
export class BrowserTabComponent {
  @Input() icon: Icons | any;
  @Input() title: string = '';
  @Input() isActive: boolean = false;
}
