import {Component, Input} from '@angular/core';

@Component({
  selector: 'github-wireframe',
  templateUrl: './github-wireframe.component.html',
})
export class GithubWireframeComponent {
  @Input() author: string = '';
  @Input() license: string = '';
  @Input() repository: string = '';
  @Input() description: string = '';
}
