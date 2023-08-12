import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'header-image',
  animations: [
    trigger('outlineAnimation', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('show => hide', [animate('0.4s 2s ease')]),
    ]),
    trigger('imageAnimation', [
      state('hide', style({ opacity: 0 })),
      state('show', style({ opacity: 1 })),
      transition('hide => show', [animate('0.5s 1.8s ease')]),
    ]),
  ],
  templateUrl: './header-image.component.html',
})
export class HeaderImageComponent {

  controlsImageAnimation: 'show' | 'hide' = 'hide';
  controlsOutlineAnimation: 'show' | 'hide' = 'show';

  protected imageMask = `url("data:image/svg+xml,%3Csvg width='603' height='590' fill='none' viewBox='0 0 603 590' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m0 0v393h228v9.5c0 103.55 83.947 187.5 187.5 187.5s187.5-83.947 187.5-187.5v-402.5h-603z' fill='%23000'/%3E%3C/svg%3E%0A")`;

  onAnimationComplete() {
    this.controlsOutlineAnimation = 'hide';
    this.controlsImageAnimation = 'show';
  }
}
