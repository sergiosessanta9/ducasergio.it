import { Component, EventEmitter, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'header-title',
  styleUrls: ['./header-title.component.scss'],
  animations: [
    trigger('headerAnimation', [
      state('hide', style({ opacity: 0, transform: 'translateX(-32px)' })),
      state('show', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hide => show', [animate('0.5s 0.1s ease')]),
    ]),
    trigger('emojiAnimation', [
      state('hide', style({ opacity: 0, transform: 'translateY(16px) rotate(30deg)' })),
      state('show', style({ opacity: 1, transform: 'translateY(0) rotate(0)' })),
      transition('hide => show', [animate('0.7s ease')]),
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
  templateUrl: './header-title.component.html',
})
export class HeaderTitleComponent {
  animationState: 'hide' | 'show' = 'hide';
  emojiState: 'hide' | 'show' = 'hide';
  textState: 'hide' | 'show' = 'hide';
  descriptionState: 'hide' | 'show' = 'hide';

  // Variabili per gestire i clic
  clickCount = 0;  // Numero di clic
  @Output() showConfetti  = new EventEmitter<void>();  // Controlla la visibilità del canvas dei coriandoli

  onEmojiLoaded() {
    this.animationState = 'show';
    this.emojiState = 'show';
    this.textState = 'show';
    this.descriptionState = 'show';
  }

  // Funzione chiamata al clic sull'elemento
  handleClick() {
    this.clickCount++;
    // Se l'utente ha cliccato 5 volte, mostra l'animazione
    if (this.clickCount === 5) {
      this.clickCount = 0;  // Resetta il contatore dei clic
      setTimeout(() => {
        this.showConfetti.emit();  // Mostra il canvas per i coriandoli
      }, 0);
    }
  }
}
