import {Component, HostListener, OnInit} from '@angular/core';
import {GlobalService} from "../services/global-service";
import {ScrollService} from "../services/scroll-service";
import {NavigationEnd, NavigationStart, Router, Scroll} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ducasergio.it';

  constructor(protected global: GlobalService, private scrollService: ScrollService,private router: Router) {}

  openQuickAccess(): void {
    this.global.isQuickAccessOpen = true;
  }

  closeQuickAccess(): void {
    this.global.isQuickAccessOpen = false;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.scrollService.emitScrollEvent(event);
  }

  ngOnInit(): void {
    document.documentElement.setAttribute('data-accent', this.global.getAccentColor());
  }
}
