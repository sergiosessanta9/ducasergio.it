import {Component, ContentChild, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() title?: string;
  @Input() caption?: string;
  @Input() description?: string;
  @ContentChild(TemplateRef) public inputElement: TemplateRef<any> | any;
}
