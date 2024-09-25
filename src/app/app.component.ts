import {Component, HostListener, OnInit} from '@angular/core';
import {GlobalService} from "../services/global-service";
import {ScrollService} from "../services/scroll-service";
import {NavigationEnd, NavigationStart, Router, Scroll} from "@angular/router";
import {filter} from "rxjs";
import { ApiService } from 'src/services/api-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ducasergio.it';

  isChristmas: boolean = false;

  constructor(protected global: GlobalService, private scrollService: ScrollService,private router: Router, private apiSevice: ApiService) {}

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
    this.isChristmas = this.checkIsChristmas();
  }

  checkIsChristmas(): boolean {
    this.apiSevice.getDate().subscribe(
      (data) => {
        if (data) {
          if (this.isDateInRange(data.date!)) {
            this.global.setThemeWithoutSaving('dark');
            this.isChristmas = true;
          }
        } 
      }
    );
    return this.isChristmas;
  }

  private isDateInRange(dateString: string): boolean {
    // Converti la stringa in un oggetto Date
    const date = new Date(dateString);
  
    // Verifica che la data sia valida
    if (isNaN(date.getTime())) {
      console.error('Data non valida:', dateString);
      return false;
    }
  
    // Ottieni l'anno della data specificata
    const year = date.getFullYear();
  
    // Definisci l'inizio e la fine dell'intervallo: 20 dicembre - 28 dicembre
    const startDate = new Date(year, 11, 23); // 11 è dicembre (mesi da 0 a 11)
    const endDate = new Date(year, 11, 25);   // 28 dicembre
  
    // Controlla se la data è nell'intervallo
    return date >= startDate && date <= endDate;
  }
}
