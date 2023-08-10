import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'nav-logo',
  templateUrl: './nav-logo.component.html',
})
export class NavLogoComponent implements OnInit{

  @Input() href!: string;
  @Input() title!: string;

  protected isActive: boolean = true;

  constructor(private router: Router) {

  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isActive = (this.router.url == '' || this.router.url == '/');
      }
    });
  }
}
