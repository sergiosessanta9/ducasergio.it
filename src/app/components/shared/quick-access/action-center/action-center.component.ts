import {AfterViewInit, Component, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import {GlobalService} from "../../../../../services/global-service";
import {Icons} from "../../icons";

@Component({
  selector: 'action-center',
  animations: [
    trigger('animation', [
      state('false', style({opacity: 0})),
      state('true', style({opacity: 1})),
      transition('false => true', [animate(`0.084s ease-out`)]),
    ])
  ],
  templateUrl: './action-center.component.html',
})
export class ActionCenterComponent implements OnInit{

  protected readonly Icons = Icons;
  public animateInStart = false;
  protected theme: string = 'light';
  protected focusMode: boolean = false;

  constructor(protected global: GlobalService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.startAnimation();
    });
  }

  handleThemeChange() {
    this.global.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.theme = this.global.theme;
  }

  toggleFocusMode() {
    this.focusMode = !this.focusMode;
  }

  startAnimation(){
    this.animateInStart = true
  }
}
