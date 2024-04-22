import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TTableOfContentsItem} from "../table-of-contents/models/t-table-of-contents-item";
import {GlobalService} from "../../../services/global-service";
import {Router} from "@angular/router";
import { IMetadata } from 'src/app/models/interfaces/imetadata';
import { DatePipe } from '@angular/common';
import { IArticle } from 'src/app/models/interfaces/iarticle';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  /*
  styleUrls: [
    './../../../styles/md-components.scss',
    './../../../styles/md-contents.scss'
  ]
  */
})
export class MarkdownComponent implements OnInit {

  protected path: string = '';
  protected error = false;
  protected loaded = false;

  @ViewChild('markdown', {static:true}) markdown?: ElementRef;

  // For UI
  protected article?: IArticle;
  showMediaSection = false;

  constructor(
    router: Router, 
    private globalService: GlobalService,  
    private datePipe: DatePipe,
    ) {
    this.path = router.url;
  }

  ngOnInit(): void {
    const theme = this.globalService.getTheme();
    document.documentElement.setAttribute('data-accent', this.article?.metadata.accent != null ? this.article?.metadata.accent : this.globalService.getAccentColor());
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
      this.article = data;
      this.showMediaSection = this.path.includes('blog') || this.path.includes('today-i-learned');
      if (this.article?.metadata.accent ) {
        this.markdown?.nativeElement.setAttribute('data-accent', this.article?.metadata.accent );
      } 
      
      
      if(!window.location.hash){
        window.scrollTo(0, 0);
      }

      this.loaded = true;

    } else {
      this.error = true;
    }
  }

}
