import {Component} from '@angular/core';
import {Icons} from "../../components/shared/icons";
import { GlobalService } from 'src/services/global-service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  animations: [
    trigger('drawLine', [
      state('initial', style({
        strokeDashoffset: 10,
      })),
      state('final', style({
        strokeDashoffset: 0,
      })),
      transition('initial => final', animate('2.5s ease-in'))
    ])
  ]
})
export class ProjectsComponent {

  animationState = 'initial';

  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit(): void {
    const theme = this.globalService.getTheme();
    document.documentElement.setAttribute('data-accent', this.globalService.getAccentColor());
    document.documentElement.classList.add(theme);
    
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.animationState = 'final';
    }, 500); 
  }

  currentState: 'npm' | 'github' = 'github';
  browserTabs = [
    {
      icon: Icons.GitHub,
      title: 'sergiosessanta9/ducasergio.it - GitHub',
      isActive: this.currentState === 'github'
    },
    {
      icon: Icons.Npm,
      title: 'ducasergio.it - npm',
      isActive: this.currentState === 'npm'
    }
  ];

  setCurrentState(state: 'npm' | 'github'): void {
    this.currentState = state;
  }

  protected readonly Icons = Icons;
}
