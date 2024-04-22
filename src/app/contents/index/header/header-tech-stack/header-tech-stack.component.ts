import {Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Icons} from "../../../../components/shared/icons";
@Component({
  selector: 'header-tech-stack',
  animations: [
    trigger('techStackAnimation', [
      state('hide', style({ transform: 'translateX(-8px)', opacity: 0 })),
      state('show', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('hide => show', [animate('0.2s 1s')]),
    ]),
  ],
  styleUrls: ['header-tech-stack.component.css'],
  templateUrl: './header-tech-stack.component.html',
})
export class HeaderTechStackComponent implements OnInit{
  animationState: 'show' | 'hide' = 'hide';
  state: 'show' | 'hide' = 'hide';

  icons = [
    { component: Icons.AngularIcon, hoverColor: "#DD0031", classes: 'h-8 w-8', state: 'hide' },
    { component: Icons.TypeScriptIcon, hoverColor: "#3178C6", classes: 'h-6 w-6', state: 'hide' },
    { component: Icons.JavaIcon, hoverColor: "#f55419", classes: 'h-6 w-6 -mt-2', state: 'hide' },
    { component: Icons.WSO2Icon, hoverColor: "#FF7300", classes: 'h-16 w-16', state: 'hide' },
    { component: Icons.TailwindCssIcon, hoverColor: "#007ACC", classes: 'h-6 w-6', state: 'hide' },
    { component: null, hoverColor: 'transparent', classes: 'h-3 w-[1px] bg-slate-300 dark:bg-slate-700', state: 'hide' },
    { component: Icons.VSCodeIcon, hoverColor: "#007ACC", classes: 'h-6 w-6', state: 'hide' },
    { component: Icons.IntelliJIcon, hoverColor: "#f91225", classes: 'h-9 w-9', state: 'hide' },
    // Add other icons
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.animationState = "show";
    });
  }
  onAnimationComplete() {
  }
}
