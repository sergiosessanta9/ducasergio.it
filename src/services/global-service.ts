import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  public isQuickAccessOpen: boolean = false;
  public theme: 'dark' | 'light' = 'light';

}
