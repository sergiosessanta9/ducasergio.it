import {Component, Input} from '@angular/core';

@Component({
  selector: 'skeleton',
  templateUrl: './skeletons.component.html',
})
export class SkeletonsComponent {
  @Input() width: number = 16;
}
