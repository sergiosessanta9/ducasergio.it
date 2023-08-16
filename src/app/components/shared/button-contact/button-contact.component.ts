import { Component } from '@angular/core';
import {BaseUrlService} from "../../../../services/base-url-service";

@Component({
  selector: 'button-contact',
  templateUrl: './button-contact.component.html',
})
export class ButtonContactComponent {
  baseUrl: string;

  constructor(private baseUrlService: BaseUrlService) {
    this.baseUrl = baseUrlService.getBaseUrl();
  }
}
