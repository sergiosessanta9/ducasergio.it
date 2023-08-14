import {Component, OnInit} from '@angular/core';
import {TTableOfContentsItem} from "../table-of-contents/models/t-table-of-contents-item";
import {GlobalService} from "../../../services/global-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: [
    './../../../styles/md-components.scss',
    './../../../styles/md-contents.scss'
  ]
})
export class MarkdownComponent implements OnInit {

  protected path: string = '';
  protected error = false;
  protected loaded = false;

  // For UI
  protected items: TTableOfContentsItem[] = [];
  protected title?: string;
  protected caption?: string;
  protected description?: string;

  constructor(router: Router, private globalService: GlobalService) {
    this.path = router.url;
  }

  ngOnInit(): void {
    const theme = this.globalService.getTheme();
    document.documentElement.setAttribute('data-accent', this.globalService.getAccentColor());
    document.documentElement.classList.add(theme);
    setTimeout(() => {
      this.scrollToElement(window.location.hash);
    }, 800);
  }

  protected scrollToElement(id: string) {
    const element = document.getElementById(id.replaceAll('#', ''));
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
    }
  }

  onLoad(data: any) {
    if (data){
      this.title = data.title;
      this.caption = data.caption;
      this.description = data.description;
      this.items = data.tableOfContents;

      if(!window.location.hash){
        window.scrollTo(0, 0);
      }

    } else {
      this.error = true;
    }
  }

}
