import {Component, EventEmitter, Output} from '@angular/core';
import {NavLink} from "./models/NavLink";
import {Icons} from "../shared/icons";
import {ScrollService} from "../../../services/scroll-service";
import {GlobalService} from "../../../services/global-service";
import {Links} from "../shared/links";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

  constructor(private scrollService: ScrollService, protected global: GlobalService) {
  }

  @Output() onOpenQuickAccess = new EventEmitter<any>();

  protected baseLinks = [
    {
      title: 'Projects',
      href: '/projects'
    },
    {
      title: 'Blog',
      href: '/blog'
    },
    {
      title: 'T.I.L',
      href: '/today-i-learned'
    }
  ];

  protected appLinks = [
    new NavLink('Skills & Tools', '/work/skills-and-tools'),
    new NavLink('Experience', '/work/experience'),
    new NavLink('Studio', '/work/studio'),
    new NavLink('Contact', '/work/contact'),
  ];

  protected socialLinks = [
    new NavLink('LinkedIn', Links.LinkedIn, Icons.LinkedIn),
    new NavLink('GitHub', Links.GitHub, Icons.GitHub),
  ];

  ngOnInit() {
    this.scrollService.scrollEvent.subscribe((event) => {
      this.global.isScrolled = window.scrollY > 60;
    });
  }

  openQuickAccess(): void {
    this.onOpenQuickAccess?.emit();
  }


}
