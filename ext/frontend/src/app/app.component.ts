import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthStateService } from 'app/auth/services/auth-state.service';
import { ApplicationStateService } from 'app/shared/services/application-state.service';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { MetricsService } from 'app/shared/services/metrics.service';
import { Observable } from 'rxjs';

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
    this.authStateService.userData$.pipe(takeUntilDestroyed()).subscribe((userData) => this.canUserRateApplication = !!userData?.canRateApplication);
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
