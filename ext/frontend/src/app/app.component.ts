import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApplicationStateService } from 'app/shared/services/application-state.service';
import { MetricsService } from 'app/shared/services/metrics.service';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { AuthStateService } from 'app/auth/services/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit{
  public isLoading$: Observable<boolean>;
  public unauthorizedPaths: string[] = ['/login', '/register']
  public isFeedbackVisible: boolean = true;
  public canUserRateApplication: boolean;

  constructor(private applicationStateService: ApplicationStateService,
              private configurationService: ConfigurationService,
              private authStateService: AuthStateService,
              private router: Router,
              private metricsService: MetricsService) {
    this.isLoading$ = this.applicationStateService.isLoading$;
    this.authStateService.userData$.pipe(takeUntilDestroyed()).subscribe(({ canRateApplication }) => this.canUserRateApplication = canRateApplication);
  }

  public ngOnInit(): void {
    this.authStateService.recoverToken().then(() => {
      this.configurationService.getCurrentAgentState();
      this.authStateService.authenthicateAgent();
      this.configurationService.markUserActivity();
      const pathName: string =  window.location.pathname;
      if (this.unauthorizedPaths.includes(pathName)) {
        this.router.navigateByUrl('/issues-dashboard')
      }
    }).catch(err => {
      if (!this.router.url.includes('login')) {
        this.router.navigateByUrl('/login')
      }
    })
  }

  public sendFeedback(rating: number): void {
    this.metricsService.sendFeedbackRating(rating).subscribe(() => {
      this.hideFeedback();
    })
  }

  public hideFeedback(): void {
    this.isFeedbackVisible = false;
  }
}
