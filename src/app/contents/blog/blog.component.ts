import { Component, OnInit } from '@angular/core';
import { BlogVO } from 'src/app/models/blog-vo';
import { ApiService } from 'src/services/api-service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GlobalService } from 'src/services/global-service';
import { BlogArticleVO } from 'src/app/models/blog-article-vo';
import { Icons } from 'src/app/components/shared/icons';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
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
export class BlogComponent implements OnInit {

  constructor(private api: ApiService, private globalService: GlobalService,) {

  }

  protected readonly Icons = Icons;
  
  animationState = 'initial';
  articles: BlogVO[] = [];
  hasError = false;
  isEmpty = false;
  isHover = false;


  ngOnInit(): void {
    const theme = this.globalService.getTheme();
    document.documentElement.setAttribute('data-accent', this.globalService.getAccentColor());
    document.documentElement.classList.add(theme);

    this.api.getBlogs().subscribe({
      next: (data) => {
        if(!data) {
          this.hasError = true;
        } else {
          if (data.length == 0){
            this.isEmpty = true;
          } else {
            this.articles = data;
            this.articles.forEach(a => {
              this.animateViews(a, 1500);
              this.animateShares(a, 1500);
            });
            
          }
          
        }
      },
      error: (error) => {
        this.hasError = true;
      }
    });

    if(!window.location.hash){
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }

    setTimeout(() => {
      this.animationState = 'final';
    }, 500); 
  }

  private animateViews(article: BlogArticleVO, duration: number) {
    let finalNumber = article?.views ?? 0;
    let currentNumber = 0;
    const increment = finalNumber * (10 / duration); // Calcola l'incremento per ogni frame assumendo un frame ogni 10ms

    const interval = setInterval(() => {
        currentNumber += increment;
        let value = Math.min(Math.round(currentNumber), finalNumber);
        if (value != article.views) {
          article.views = value;
        }
        if (currentNumber >= finalNumber) {
            clearInterval(interval);
            article.views = finalNumber;
        }
    }, 10);
  }

  private animateShares(article: BlogArticleVO, duration: number) {
    let finalNumber = article?.shares ?? 0;
    let currentNumber = 0;
    const increment = finalNumber * (10 / duration);

    const interval = setInterval(() => {
        currentNumber += increment;
        let value = Math.min(Math.round(currentNumber), finalNumber);
        if (value != article.shares) {
          article.shares = value;
        }
        
        if (currentNumber >= finalNumber) {
            clearInterval(interval);
            article.shares = finalNumber;
        }
    }, 10);
  }


}
