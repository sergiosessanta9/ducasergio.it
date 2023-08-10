import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Icons} from "../../icons";

@Component({
  selector: 'action-center-button',
  templateUrl: './action-center-button.component.html',
})
export class ActionCenterButtonComponent {

  @Output() onClick = new EventEmitter<any>();
  @Input() active = true;
  @Input() icons?: Icons[];
  @Input() text?: string;

}
