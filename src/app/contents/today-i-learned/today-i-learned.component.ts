import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { log } from 'console';
import { ClipboardService } from 'ngx-clipboard';
import { BlogArticleVO } from 'src/app/models/blog-article-vo';
import { ApiService } from 'src/services/api-service';
import { TodayILearnedVO } from 'src/app/models/today-i-learned-vo';
import { GlobalService } from 'src/services/global-service';

@Component({
  selector: 'today-i-learned',
  templateUrl: './today-i-learned.component.html',
  animations: [
    trigger('drawLine', [
      state('initial', style({
        strokeDashoffset: 10,
      })),
      state('final', style({
        strokeDashoffset: 0,
      })),
      transition('initial => final', animate('2.5s ease-in'))
    ])
  ]
})
export class TodayILearnedComponent implements OnInit {

  animationState = 'initial';
  protected data: BlogArticleVO | any;
  protected loaded = false;
  protected error = false;
  protected articles: TodayILearnedVO[] | any;

  constructor(private clipboardService: ClipboardService, private api: ApiService, private globalService: GlobalService){

  }

  ngOnInit(): void {
    const theme = this.globalService.getTheme();
    document.documentElement.classList.add(theme);
    this.api.getTILs().subscribe(
      (data: TodayILearnedVO[]) => {
        if (data) {

          this.articles = data;
        }
      },
      (error) => {
        this.error = true;
      }
    );

    if(!window.location.hash){
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }

    setTimeout(() => {
      this.animationState = 'final';
    }, 500); 
  }

  b64ToText(text: string){
    return atob(text);
  }

  onLoad(data: any) {
    if (data){
      this.data = data;

      this.loaded = true;

    } else {
      this.error = true;
    }
  }

  handleClick(event: any, index: number) {
    const target = event.target as HTMLElement;
    let parent: any;

    if (target.classList.contains('mdx-code__copy-button')) {
      parent = target.parentElement;
    } else if (target.parentElement?.classList.contains('mdx-code__copy-button')) {
      parent = target.parentElement?.parentElement;
    } else if (target.parentElement?.parentElement?.classList.contains('mdx-code__copy-button')){
      parent = target.parentElement?.parentElement?.parentElement;
    }

    if (parent) {
      if ((parent.querySelectorAll(".mdx-code__copy-button-message")[0]).classList.contains("mdx-code__copy-button-message-copied")){
        (parent.querySelectorAll(".mdx-code__copy-button-message")[0]).classList.remove("mdx-code__copy-button-message-copied");
      }
      (parent.querySelectorAll(".mdx-code__copy-button-message")[0]).classList.add("mdx-code__copy-button-message-copied");
      this.clipboardService.copy(this.extractTextBetweenBackticks(this.b64ToText(this.articles[index].markdown)));
      setTimeout(() => {
        (parent.querySelectorAll(".mdx-code__copy-button-message")[0]).classList.remove("mdx-code__copy-button-message-copied");
      }, 1000); 
    }
  }


  private extractTextBetweenBackticks(text: string): string {
    const regex = /```(.*?)```/s;  // Using 's' flag to match across multiple lines if needed
    const match = text.match(regex);

    const lines = (match ? match[1].trim() : '').split('\n'); // Split the text into an array of lines
    lines.shift(); // Remove the first element
    return lines.join('\n');
  }

}
