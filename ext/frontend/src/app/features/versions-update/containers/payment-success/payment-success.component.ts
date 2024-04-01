import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-success-component',
  templateUrl: './payment-success.component.html',
  styleUrls: [ './payment-success.component.scss' ]
})
export class PaymentSuccessComponent {
  public constructor(private activatedRoute: ActivatedRoute) {
    console.log(this.activatedRoute.snapshot.queryParams)
    // call /user/complete-upgrade-pro?session_id=<ID>
  }
}
