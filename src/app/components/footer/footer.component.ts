import { Component } from '@angular/core';
import {GlobalService} from "../../../services/global-service";
import {Links} from "../shared/links";
import {FooterGroup} from "./models/footer-group";
import {FooterLink} from "./models/footer-link";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  protected readonly Links = Links;
  protected year = new Date().getFullYear();

  protected groups =[
    new FooterGroup('Work', [
      new FooterLink('Contact','/work/contact'),
      new FooterLink('Experience','/work/experience'),
      new FooterLink('Skills and Tools','/work/skills-and-tools'),
      new FooterLink('Studio','/work/studio'),
    ]),
    new FooterGroup('Learn', [
      //new FooterLink('Docs','/docs'),
      new FooterLink('Personal Blog','/blog', 'new'),
      new FooterLink('T.I.L','/today-i-learned', 'new'),
    ]),
    new FooterGroup('This Site', [
      new FooterLink('Design Inspiration','https://github.com/enjidev/enji.dev', null, false),
      new FooterLink('Source Code',Links.ProjectRepo,null, false),
      new FooterLink('Credits','/credits',  null, true, false),
      new FooterLink('Request CV','/request-cv',  'new', true, false),
    ]),
  ]

  constructor(private global: GlobalService) {}
}
