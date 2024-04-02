import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-cancel-component',
  templateUrl: './payment-cancel.component.html',
  styleUrls: [ './payment-cancel.component.scss' ]
})
export class PaymentCancelComponent {
  public constructor(private router: Router) {}

  public goToDashboard(): void {
    this.router.navigateByUrl('/issues-dashboard');
  }

}
