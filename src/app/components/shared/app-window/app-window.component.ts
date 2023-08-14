import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-app-window',
  templateUrl: './app-window.component.html',
})
export class AppWindowComponent {
  @Input() type: 'browser' | 'app' = 'app';
  @Input() browserTabs?: any[];
  @Input() children: any = null;

  isWithBrowserTabs(){
    return this.type == 'browser' && this.browserTabs != null
  };
}
