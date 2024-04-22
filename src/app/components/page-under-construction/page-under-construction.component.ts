import { Component } from '@angular/core';
import { GlobalService } from 'src/services/global-service';
@Component({
  selector: 'page-under-construction',
  templateUrl: './page-under-construction.component.html',
  styleUrls: ['./page-under-construction.component.scss']
})
export class PageUnderConstructionComponent {
  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit(): void {
    const theme = this.globalService.getTheme();
    document.documentElement.setAttribute('data-accent', this.globalService.getAccentColor());
    document.documentElement.classList.add(theme);
    if(!window.location.hash){
      window.scrollTo(0, 0);
    }
  }
}
