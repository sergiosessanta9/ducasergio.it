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
    ]),
    trigger('palette', [
      state('false', style({opacity: 0, 'zIndex': -1, height: 0})),
      state('true', style({opacity: 1, 'zIndex': 1, height: '100%'})),
      transition('false => true', [animate(`0.3s ease`)]),
      transition('true => false', [animate(`0.3s ease`)]),
    ]),
    trigger('paletteList', [
      state('false', style({visibility: 'hidden', height: '0%'})),
      state('true', style({visibility: 'visible', height: '100%'})),
      transition('* <=> *', [animate(`20s ease`)]),
    ])
  ],
  templateUrl: './action-center.component.html',
})
export class ActionCenterComponent implements OnInit{

  protected readonly Icons = Icons;
  protected animateInStart = false;
  protected paletteOpen = false;
  protected theme: string = 'light';
  protected accentColor: 'violet'| 'blue'| "green"| "orange"| "yellow"|"amber"| "indigo" = 'blue';
  protected colors: string[] = ['violet', 'blue', "green", "orange", "yellow","amber", "indigo", "sky", "rose", 'cyan', "emerald", "red"];

  constructor(protected global: GlobalService) {
  }

  ngOnInit() {
    this.theme = this.global.getTheme();
    setTimeout(() => {
      this.startAnimation();
    });
  }

  handleThemeChange() {
    this.global.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.theme = this.global.theme;
    this.global.setTheme(this.theme);
    document.documentElement.classList.toggle('dark', this.theme === 'dark');
  }

  toggleFocusMode() {
    this.paletteOpen = !this.paletteOpen;
  }

  startAnimation(){
    this.animateInStart = true
  }

  getAccentColor(){
    return `Accent: ${this.global.getAccentColor()}`;
  }

  changeAccent(color: string) {
    this.global.setAccentColor(color);
  }
}
