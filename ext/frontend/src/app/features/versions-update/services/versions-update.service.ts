import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VersionsUpdateService {
  constructor(private httpClient: HttpClient) {
  }

  public confirmVersionUpdateToPro(sessionId: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiUrl}/user/complete-upgrade-pro?session_id=${sessionId}`, {});
  }

}