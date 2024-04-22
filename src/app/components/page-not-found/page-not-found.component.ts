import {Component, OnInit} from '@angular/core';
import {Icons} from "../shared/icons";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {GlobalService} from "../../../services/global-service";
import {Location} from "@angular/common";

@Component({
  selector: 'page-not-found',
  animations: [
    trigger('headerAnimation', [
      state('hide', style({ opacity: 0, transform: 'translateX(-32px)' })),
      state('show', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hide => show', [animate('0.5s 0.1s ease')]),
    ]),
    trigger('textAnimation', [
      state('hide', style({ opacity: 0, transform: 'translateX(-32px)' })),
      state('show', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hide => show', animate('0.5s 0.2s ease')),
    ]),
    trigger('descriptionAnimation', [
      state('hide', style({ opacity: 0, transform: 'translateX(-32px)' })),
      state('show', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hide => show', animate('0.5s ease')),
    ]),
  ],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit{
  protected readonly Icons = Icons;

  animationState: 'hide' | 'show' = 'hide';
  textState: 'hide' | 'show' = 'hide';
  descriptionState: 'hide' | 'show' = 'hide';

  constructor(private globalService: GlobalService, protected location: Location) {
  }

  ngOnInit(): void {
    const theme = this.globalService.getTheme();
    document.documentElement.classList.add(theme);
    setTimeout(() => {
      this.animationState = "show";
      this.textState = "show";
      this.descriptionState = "show";
    });
    if(!window.location.hash){
      window.scrollTo(0, 0);
    }
  }

}
