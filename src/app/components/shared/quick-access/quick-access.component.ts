import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from '@angular/core';
import {Icons} from "../icons";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import {GlobalService} from "../../../../services/global-service";

@Component({
  selector: 'quick-access',
  animations: [
    trigger('animation', [
      state('hide', style({opacity: 0, visibility: 'hidden'})),
      state('show', style({opacity: 1, visibility: 'visible'})),
      transition('hide => show', [animate(`150ms ease-in`)]),
      transition('show => hide', [animate(`150ms ease-out`)]),
    ]),
    trigger('blur', [
      state('hide', style({opacity: 0, visibility: 'hidden'})),
      state('show', style({opacity: 1, visibility: 'visible'})),
      transition('hide => show', [animate(`100ms ease-in`)]),
      transition('show => hide', [animate(`100ms ease-out`)]),
    ])
  ],
  templateUrl: './quick-access.component.html',
})
export class QuickAccessComponent {

  protected readonly Icons = Icons;
  protected animationState: 'hide' | 'show' = 'hide';

  @ViewChild('closeButton') closeButton?: ElementRef;

  @Output() onClose = new EventEmitter<any>();

  constructor(protected global: GlobalService) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    //if (this.global.isQuickAccessOpen) {
    //  this.setQuickAccessOpen(false);
    //}
  }

  setQuickAccessOpen(value: boolean): void {
    this.global.isQuickAccessOpen = value;
    this.animationState = value ? 'show' : 'hide';
    if (value) {
      this.closeButton?.nativeElement.focus();
    } else {
      this.onClose.emit();
    }
  }
}
