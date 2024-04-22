import { Injectable, Inject } from '@angular/core';
import { debounceTime } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

export interface Alert {
  title: string; 
  message: string;
  type: 'success' | 'error' | 'warn' | 'info';
}

@Injectable({
    providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<Alert | null>();
  private clearAlertSubject = new Subject<void>();

  showAlert(alert: Alert): void {
    this.clearAlert();
    console.log('Alert received:', alert);
    // Invio il nuovo alert dopo un breve delay per assicurarsi che il vecchio alert sia stato rimosso
    this.clearAlertSubject.pipe(debounceTime(10)).subscribe(() => {
      this.alertSubject.next(alert);
      setTimeout(() => this.clearAlert(), 5000);
    });
    this.clearAlertSubject.next();
  }

  getAlert() {
    return this.alertSubject.asObservable();
  }

  clearAlert() {
    this.alertSubject.next(null);
  }
}
