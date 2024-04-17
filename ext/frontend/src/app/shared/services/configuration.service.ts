import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'environment/environment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { agentAuthDataDTO } from '../interfaces/AgentAuthDataDTO';
import { AgentStateDTO } from '../interfaces/AgentStateDTO';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  public currentAgentState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isCurrentAgentStateInitialized: boolean = false;
  public isAgentInitialized: boolean = false;

  public get currentAgentState(): boolean {
    return  this.currentAgentState$.value;
  }

  public set currentAgentState(value: boolean) {
    this.currentAgentState$.next(value);
  }

  constructor(private httpClient: HttpClient, private toastrService: ToastrService, private translateService: TranslateService) {
  }

  public getCurrentAgentState(): void {
    this.httpClient.get<AgentStateDTO>(`${environment.agentApiUrl}/control/state`).subscribe((agentState: AgentStateDTO) => {
      this.currentAgentState = agentState.state;
      this.isCurrentAgentStateInitialized = true;
    })
  }
  
  public setAgentState(agentStatePayload: AgentStateDTO): void {
    this.httpClient.post<void>(`${environment.agentApiUrl}/control/state`, agentStatePayload).subscribe(() => {
      this.currentAgentState = agentStatePayload.state;
      if (this.isAgentInitialized) {
        if (this.currentAgentState) {
          this.toastrService.success(this.translateService.instant('CONFIGURATION.AGENT_STATE_ACTIVATED'));
        } else {
          this.toastrService.success(this.translateService.instant('CONFIGURATION.AGENT_STATE_DEACTIVATED'));
        }
      }
      this.isAgentInitialized = true;
    });
  }

  public openBillingPortal(): void {
    this.httpClient
      .get(`${environment.apiUrl}/user/manage-pro`)
      .subscribe((data: any) => {
        window.location.href = data.url;
      });
  }

  public setAgentAuthData(agentAuthData: agentAuthDataDTO): void {
    this.httpClient.post<void>(`${environment.agentApiUrl}/control/auth_data`, agentAuthData).subscribe(() => {
      this.toastrService.success(this.translateService.instant('CONFIGURATION.AGENT_AUTH_DATA_UPDATED'));
    });
  }

  public markUserActivity(): void {
    this.httpClient.get<void>(`${environment.apiUrl}/user/last-activity`).subscribe();
  }
}