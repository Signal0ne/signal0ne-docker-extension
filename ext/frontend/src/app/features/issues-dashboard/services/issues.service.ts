import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReportIssueAnaliseDTO } from 'app/shared/interfaces/ReportIssueAnaliseDTO';
import { Observable } from 'rxjs';
import { environment } from 'environment/environment';
import { IssueSearchCriteriaDTO } from 'app/shared/interfaces/IssueSearchCriteriaDTO';
import { HttpEncoder } from 'app/shared/util/HttpEncoder';
import { NormalizeObjectValue } from 'app/shared/util/NormalizeObjectValue';
import { DetailedIssueDTO } from 'app/shared/interfaces/DetailedIssueDTO';
import { SearchIssuesResponseDTO } from 'app/shared/interfaces/SearchIssuesResponseDTO';
import { RateIssueDTO } from 'app/shared/interfaces/RateIssueDTO';

@Injectable({ providedIn: 'root' })
export class IssuesService {
  constructor(private httpClient: HttpClient) {
  }

  public getIssuesContainers(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.apiUrl}/user/containers`);
  }

  public getIssuesList(searchCriteria?: IssueSearchCriteriaDTO, revokeLoader: boolean = false): Observable<SearchIssuesResponseDTO> {
    if (searchCriteria) {
      const searchCriteriaClone = {...searchCriteria}
      if (searchCriteriaClone.startTimestamp) {
        searchCriteriaClone.startTimestamp = new Date(searchCriteriaClone.startTimestamp).toISOString();
      }
      if (searchCriteriaClone.endTimestamp) {
        searchCriteriaClone.endTimestamp = new Date(searchCriteriaClone.endTimestamp).toISOString();
      }

      if (searchCriteriaClone.isResolved) {
        searchCriteriaClone.isResolved = false;
      } else {
        searchCriteriaClone.isResolved = null;
      }

      const params: HttpParams = new HttpParams({
        encoder: new HttpEncoder(),
        fromObject: { ...(NormalizeObjectValue(searchCriteriaClone, [ 'startTimestamp', 'endTimestamp' ]) as any) }
      });

      return this.httpClient.get<SearchIssuesResponseDTO>(`${environment.apiUrl}/user/issues?revokeLoader=${revokeLoader}`, { params });
    } else {
      return this.httpClient.get<SearchIssuesResponseDTO>(`${environment.apiUrl}/user/issues?revokeLoader=${revokeLoader}`);
    }

  }

  public getIssue(issueId: string): Observable<DetailedIssueDTO> {
    return this.httpClient.get<DetailedIssueDTO>(`${environment.apiUrl}/user/issues/${issueId}`);
  }

  public reportIssueAnalise(issueId: string, reportIssueData: ReportIssueAnaliseDTO): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiUrl}/user/issues/report`,
      {
            issueId: issueId,
            shouldDelete: !!reportIssueData.shouldDelete,
            reason: reportIssueData.reason
      });
  }


  public rateIssue(issueId: string, rateIssueData: RateIssueDTO): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiUrl}/user/issues/${issueId}/score`, rateIssueData);
  }

  public regenerateIssue(issueId: string): Observable<DetailedIssueDTO> {
    return this.httpClient.put<DetailedIssueDTO>(`${environment.apiUrl}/user/issues/${issueId}/regenerate`, {});

  }

  public markIssueAsResolved(issueId: string): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiUrl}/user/issues/${issueId}/resolve`, {isResolved: true});
  }

}