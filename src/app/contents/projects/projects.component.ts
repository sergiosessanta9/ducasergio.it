import {Component} from '@angular/core';
import {Icons} from "../../components/shared/icons";

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {

  currentState: 'npm' | 'github' = 'github';
  browserTabs = [
    {
      icon: Icons.GitHub,
      title: 'enjidev/tailwindcss-accent - GitHub',
      isActive: this.currentState === 'github'
    },
    {
      icon: Icons.Npm,
      title: 'tailwindcss-accent - npm',
      isActive: this.currentState === 'npm'
    }
  ];

  setCurrentState(state: 'npm' | 'github'): void {
    this.currentState = state;
  }

  protected readonly Icons = Icons;
}
