import { Component, Input } from '@angular/core';
import { Icons } from '../icons';
import { Alert, AlertService } from 'src/services/alert-service';
import { Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-altert',
  templateUrl: './altert.component.html',
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(10%)' }),
        animate(130)
      ]),
      transition(':leave', [
        animate(130, style({ opacity: 0, transform: 'translateX(10%)' }))
      ])
    ])
  ]
})
export class AltertComponent {

  protected readonly Icons = Icons;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() state: 'success' | 'error' | 'warn' | 'innfo' = 'success';

  alert: Alert | null = null;
  private subscription: Subscription;

  constructor(private alertService: AlertService) {
    this.subscription = this.alertService.getAlert().subscribe((alert) => {
      this.alert = alert;
    });
  }

  closeAlert() {
    this.alertService.clearAlert();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
