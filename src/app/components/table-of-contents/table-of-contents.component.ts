import {Component, Input} from '@angular/core';
import {GlobalService} from "../../../services/global-service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TTableOfContentsItem} from "./models/t-table-of-contents-item";
import {ScrollService} from "../../../services/scroll-service";

@Component({
  selector: 'table-of-contents',
  animations: [
      trigger('fadeIn', [
          state('false', style({ opacity: 0, transform: 'translateY(-32px)' })),
          state('true', style({ opacity: 1, transform: 'translateY(0)' })),
          transition('false => true', [animate('0.2s 0.8s ease-in')]),
      ]),
  ],
  templateUrl: './table-of-contents.component.html',
})
export class TableOfContentsComponent {

  @Input() currentPage = '';
  @Input() show = false;
  @Input() items: TTableOfContentsItem[] = [];
  currentVisibles: { [slug: string]: boolean } = {};

  constructor(protected global: GlobalService, private scrollService: ScrollService) {}

  ngOnInit() {
  }

  handleScrollToTopClick() {
    window.scrollTo({ top: 0 });
  }

  get scrollButtonStyles(): any {
    return {
      transform: `translateX(${this.global.isScrolled ? '0' : '120'}px)`,
      opacity: this.global.isScrolled? 1 : 0,
      transition: 'all 0.5s ease'
    };
  }
}
