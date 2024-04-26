import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetricsService {

  constructor(private httpClient: HttpClient) {
  }

  public markProButtonClick(): Observable<void> {
    return this.httpClient.get<void>(`${environment.apiUrl}/metrics/pro-btn-clicks`)
  }

  public markProVersionCheckouts(): Observable<void> {
    return this.httpClient.get<void>(`${environment.apiUrl}/metrics/pro-checkout-clicks`)
  }

  public sendFeedbackRating(overallScore: number): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiUrl}/metrics/overall-score`, {overallScore})
  }
}