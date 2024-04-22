import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Icons } from "../../icons";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'action-center-button',
  animations: [
    trigger('iconAnimation', [
        state('hide', style({ transform: 'rotate(45deg) translateX(220px)', opacity: 0 })),
        state('show', style({ transform: 'rotate(0deg) translateX(0px)', opacity: 1 })),
        transition('hide <=> show', [animate('0.3s ease-in-out')]),
    ]),
  ],
  templateUrl: './action-center-button.component.html',
})
export class ActionCenterButtonComponent implements OnInit {

  @Output() onClick = new EventEmitter<any>();
  @Input() active = true;
  @Input() icons!: Icons[];
  @Input() states: boolean[] = [];
  @Input() text?: string;

  protected animationComplete = true;

  ngOnInit(): void {
    for (const icon in this.icons) {
      this.states.push(false);
    }
  }

  protected toggle() {
    if (this.animationComplete) {
      this.active = !this.active;
      this.onClick.emit();
    }
  }
}
