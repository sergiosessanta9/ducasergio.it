import {AfterContentInit, AfterViewInit, Component, Input} from '@angular/core';
import {TTableOfContentsItem} from "../models/t-table-of-contents-item";
import {ScrollService} from "../../../../services/scroll-service";
@Component({
  selector: 'table-of-contents-link',
  templateUrl: './table-of-contents-link.component.html',
})
export class TableOfContentsLinkComponent implements  AfterContentInit {
  @Input() active = false;
  @Input() link?: TTableOfContentsItem;

  constructor() {
  }

  private isElementVisible(element: HTMLElement | null) {
    const rect = element?.getBoundingClientRect();
    if (rect){
      const windowHeight = window.innerHeight;
      return rect.top >= 0 && rect.bottom <= windowHeight;
    }
    return false;
  }

  ngAfterContentInit(): void {
    //const id = this.link?.slug.substring(this.link?.slug?.indexOf('#')+1, this.link?.slug?.length ?? 0);
    //const element = window.document.getElementById(id);
    //console.log(element);

    //if (this.link){
    //  this.link!.visible = this.isElementVisible(element);
    //}

  }
}
