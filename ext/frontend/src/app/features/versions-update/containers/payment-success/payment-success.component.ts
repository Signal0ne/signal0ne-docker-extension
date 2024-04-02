import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthStateService } from 'app/auth/services/auth-state.service';
import { VersionsUpdateService } from 'app/features/versions-update/services/versions-update.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-success-component',
  templateUrl: './payment-success.component.html',
  styleUrls: [ './payment-success.component.scss' ]
})
export class PaymentSuccessComponent {
  public sessionId: string;
  public constructor(private activatedRoute: ActivatedRoute,
                     private router: Router,
                     private versionsUpdateService: VersionsUpdateService,
                     private toastrService: ToastrService,
                     private translateService: TranslateService,
                     private authStateService: AuthStateService) {
    this.sessionId = this.activatedRoute.snapshot.queryParams['session_id'];
    if (!this.sessionId) {
      this.goToDashboard();
    } else {
      this.authStateService.isLoggedIn$.pipe(takeUntilDestroyed()).subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.confirmUserVersionUpdate();
        }
      })
    }
  }

  public goToDashboard(): void {
    this.router.navigateByUrl('/issues-dashboard');
  }

  public confirmUserVersionUpdate(): void {
    this.versionsUpdateService.confirmVersionUpdateToPro(this.sessionId).subscribe(() => {
      this.authStateService.userDataProVersion = true;
    }, () => {
      this.goToDashboard()
    })
  }
}
