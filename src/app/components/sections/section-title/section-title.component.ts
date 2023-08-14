import {Component, Input} from '@angular/core';
import {Icons} from "../../shared/icons";

@Component({
  selector: 'section-title',
  templateUrl: './section-title.component.html',
})
export class SectionTitleComponent {
  @Input() data: 'h2' | 'h3' = 'h2';
  @Input() title: string = '';
  @Input() caption: string = '';
  @Input() description: string | any;
  @Input() button: {
    title: string;
    href: string;
  } | null = null;
  protected readonly Icons = Icons;
}
