import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'header-image',
  animations: [
    /*
    trigger('outlineAnimation', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('show => hide', [animate('0.4s 0.6s ease')]),
    ]),*/
    trigger('outlineAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.4s 0.6s ease', style({ opacity: 0 }))
      ]),
    ]),
    /*
    trigger('imageAnimation', [
      state('hide', style({ opacity: 0 })),
      state('show', style({ opacity: 1 })),
      transition('hide => show', [animate('1s ease')]),
    ]),
    */
    trigger('imageAnimation', [
      state('in', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease', style({ opacity: 1 }))
      ]),
    ]),
  ],
  templateUrl: './header-image.component.html',
})
export class HeaderImageComponent {

  controlsOutlineAnimation = true;

  protected imageMask = `url("data:image/svg+xml,%3Csvg width='603' height='590' fill='none' viewBox='0 0 603 590' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m0 0v393h228v9.5c0 103.55 83.947 187.5 187.5 187.5s187.5-83.947 187.5-187.5v-402.5h-603z' fill='%23000'/%3E%3C/svg%3E%0A")`;

  onAnimationComplete() {
    this.controlsOutlineAnimation = false;
  }
}
