import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AgentStateDTO } from 'app/shared/interfaces/AgentStateDTO';
import { ConfigurationService } from 'app/shared/services/configuration.service';

@Component({
  selector: 'app-configuration-dropdown',
  templateUrl: './configuration-dropdown.component.html',
  styleUrls: [ './configuration-dropdown.component.scss' ]
})
export class ConfigurationDropdownComponent {
  public agentState: AgentStateDTO;
  constructor(private configurationService: ConfigurationService) {
    this.configurationService.currentAgentState$.pipe(takeUntilDestroyed()).subscribe(state => {
      this.agentState = new AgentStateDTO(state)
    });
  }

  public setAgentState(): void {
    this.configurationService.setAgentState(this.agentState);
  }

}
