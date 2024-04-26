import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthStateService } from 'app/auth/services/auth-state.service';
import { AgentStateDTO } from 'app/shared/interfaces/AgentStateDTO';
import { ApplicationStateService } from 'app/shared/services/application-state.service';
import { ConfigurationService } from 'app/shared/services/configuration.service';

@Component({
  selector: 'app-configuration-dropdown',
  templateUrl: './configuration-dropdown.component.html',
  styleUrls: [ './configuration-dropdown.component.scss' ]
})
export class ConfigurationDropdownComponent {
  public agentState: AgentStateDTO;
  public isPro: boolean;
  constructor(private configurationService: ConfigurationService, private authStateService: AuthStateService) {
    this.configurationService.currentAgentState$.pipe(takeUntilDestroyed()).subscribe(state => {
      this.agentState = new AgentStateDTO(state)
    });
    this.authStateService.userData$.pipe(takeUntilDestroyed()).subscribe(({ isPro }) => {
      this.isPro = isPro
    });
  }

  public setAgentState(): void {
    this.configurationService.setAgentState(this.agentState);
  }

  public openBillingPortal(): void {
    this.configurationService.openBillingPortal();
  }

}
