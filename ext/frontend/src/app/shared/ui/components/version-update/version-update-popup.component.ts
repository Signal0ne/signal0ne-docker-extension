import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'environment/environment.development';

@Component({
  selector: 'app-version-update-popup',
  templateUrl: './version-update-popup.component.html',
  styleUrls: ['./version-update-popup.component.scss'],
})
export class VersionUpdatePopupComponent {
  public readonly price: number = environment.proAccountPrice;
  public stripePromise: Promise<Stripe> = loadStripe(environment.stripePublicKey);
  constructor(private dialogRef: DialogRef, private http: HttpClient) {}

  public async tryProUpdate(): Promise<void> {
    const payment = {
      name: 'Signal0ne Pro',
      currency: 'eur',
      amount: environment.proAccountPrice * 100,
      quantity: 1,
      cancelUrl: 'http://localhost:37001/version-update/cancel',
      successUrl: 'http://localhost:37001/version-update/success',
    };
      const stripe = await this.stripePromise;
      this.http
        .post(`${environment.apiUrl}/user/upgrade-pro`, payment)
        .subscribe((data: any) => {
          stripe.redirectToCheckout({
            sessionId: data.id,
          });
    });
  }

  public close(): void {
    this.dialogRef.close();
  }
}
