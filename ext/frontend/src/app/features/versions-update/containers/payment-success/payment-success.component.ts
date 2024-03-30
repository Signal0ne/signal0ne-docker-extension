import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-success-component',
  templateUrl: './payment-success.component.html',
  styleUrls: [ './payment-success.component.scss' ]
})
export class PaymentSuccessComponent {
  public constructor() {
    console.log('Successful payment!')
  }
}
