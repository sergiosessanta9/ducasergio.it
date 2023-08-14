import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Icons} from "../../shared/icons";

@Component({
  selector: 'app-section-button',
  templateUrl: './section-button.component.html',
})
export class SectionButtonComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon?: Icons | any = null;
  @Input() active: boolean = false;
  @Input() small: boolean = false;
  @Output() clickEvent = new EventEmitter<void>();

  onClick(): void {
    this.clickEvent.emit();
  }
}
