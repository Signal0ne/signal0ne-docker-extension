import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthStateService } from 'app/auth/services/auth-state.service';
import { LanguageVersion } from 'app/shared/enum/LanguageVersion';
import { ApplicationStateService } from 'app/shared/services/application-state.service';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { LangugageService } from 'app/shared/services/language.service';
import { ContactPopupComponent } from 'app/shared/ui/components/contact/contact-popup.component';
import { VersionUpdatePopupComponent } from 'app/shared/ui/components/version-update/version-update-popup.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public LanguageVersion: typeof LanguageVersion = LanguageVersion;
  public activeLanguage$: Observable<LanguageVersion>;
  public isLoggedIn$: Observable<boolean>;
  public isProVisible: boolean = false;

  constructor(
    private languageService: LangugageService,
    private applicationStateService: ApplicationStateService,
    protected configurationService: ConfigurationService,
    private authStateService: AuthStateService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.activeLanguage$ = this.applicationStateService.language$;
    this.isLoggedIn$ = this.authStateService.isLoggedIn$;
  }

  public changeLanguage(language: LanguageVersion): void {
    this.applicationStateService.setLanguage(language);
  }

  public changeLanguageKeydown(
    language: LanguageVersion,
    event: KeyboardEvent
  ): void {
    if (
      event instanceof KeyboardEvent &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      if (event.key === ' ') event.preventDefault();

      this.applicationStateService.setLanguage(language);
    }
  }

  public openContactModal(): void {
    this.dialog.open(ContactPopupComponent, {
      width: '500px',
    });
  }

  public openProInfoModal(): void {
    this.dialog.open(VersionUpdatePopupComponent, {
      width: '500px',
    });
  }

  public openContactModalKeydown(event: KeyboardEvent): void {
    if (
      event instanceof KeyboardEvent &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      if (event.key === ' ') event.preventDefault();

      this.dialog.open(ContactPopupComponent, {
        width: '500px',
      });
    }
  }

  public logOut(): void {
    this.authStateService.logout();
  }
}
