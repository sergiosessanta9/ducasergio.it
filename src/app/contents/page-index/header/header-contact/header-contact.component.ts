import {Component, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, animation,
} from '@angular/animations';

@Component({
  selector: 'header-contact',
  animations: [
    trigger('itemAnimation', [
      state('hide', style({ opacity: 0, transform: 'translateX(-32px)' })),
      state('show', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hide => show', [animate('0.5s ease')]),
    ]),
    trigger('isFreeAnimation', [
      state('hide', style({ opacity: 0, transform: 'translateX(-46px)' })),
      state('show', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hide => show', [animate('500ms 3000ms ease-out')]),
      transition('show => hide', [animate('500ms 3000ms ease-out')]),
    ]),
    trigger('buttonResumeAnimation', [
      state('hide', style({ opacity: 0, transform: 'translateX(-46px)' })),
      state('show', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hide => show', [animate('500ms 6950ms ease-out')]),
    ]),
  ],
  templateUrl: './header-contact.component.html',
})
export class HeaderContactComponent implements OnInit {

  protected isFree = true;
  isFreeAnimationDuration = 4;
  protected buttonContactAnimation: 'hide' | 'show' = 'hide';
  protected buttonResumeAnimation: 'hide' | 'show' = 'hide';
  protected isFreeAnimation: 'hide' | 'show' = 'hide';

  ngOnInit() {
    setTimeout(() => {
      this.buttonContactAnimation = 'show';
      this.isFreeAnimation = 'show';
      this.buttonResumeAnimation = 'show';
    }, 450);
  }

  isFreeAnimationComplete(){
    setTimeout(() => {
      this.isFreeAnimation = 'hide';
    }, 3950);
  }
}
