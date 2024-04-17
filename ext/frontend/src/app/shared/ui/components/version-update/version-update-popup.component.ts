import { ApplicationStateService } from 'app/shared/services/application-state.service';
import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'environment/environment.development';

interface Benefit {
  hasTooltip: boolean;
}

@Component({
  selector: 'app-version-update-popup',
  templateUrl: './version-update-popup.component.html',
  styleUrls: ['./version-update-popup.component.scss'],
})
export class VersionUpdatePopupComponent {
  private locale = this.languageService.language === 'pl' ? 'pl-PL' : 'en-US';

  public readonly price: string = new Intl.NumberFormat(this.locale, {
    currency: 'EUR',
    style: 'currency',
  }).format(environment.proAccountPrice);

  public stripePromise: Promise<Stripe> = loadStripe(
    environment.stripePublicKey
  );
  public benefits: Benefit[] = [
    {
      hasTooltip: true
    },
    {
      hasTooltip: false
    }
  ];

  constructor(
    private dialogRef: DialogRef,
    private http: HttpClient,
    private languageService: ApplicationStateService
  ) {}

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
