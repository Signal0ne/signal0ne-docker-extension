import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  ReportIssueAnalysisComponent
} from 'app/features/issues-dashboard/components/right-panel-components/report-issue-analysis/report-issue-analysis.component';
import { DetailedIssueDTO, DetailedIssueScore } from 'app/shared/interfaces/DetailedIssueDTO';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-solutions-list',
  templateUrl: './solutions-list.component.html',
  styleUrls: [ './solutions-list.component.scss' ]
})
export class SolutionsListComponent {
  @Input()
  public activeIssue: DetailedIssueDTO;
  @Output()
  public scoreSelected: EventEmitter<DetailedIssueScore> = new EventEmitter<DetailedIssueScore>();
  @Output()
  public markIssueAsResolved: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public regenerateIssue: EventEmitter<void> = new EventEmitter<void>();
  constructor(private clipboard: Clipboard,
              private toastrService: ToastrService,
              private translateService: TranslateService,
              private dialog: MatDialog) {
  }

  public positiveScoreSelected(): void {
    if (this.activeIssue.score === 1) {
      this.activeIssue.score = 0;
    } else {
      this.activeIssue.score = 1;
    }
    this.scoreSelected.emit(this.activeIssue.score);
  }

  public negativeScoreSelected(): void {
    if (this.activeIssue.score === -1) {
      this.activeIssue.score = 0;
    } else {
      this.activeIssue.score = -1;
    }
    this.scoreSelected.emit(this.activeIssue.score);
  }

  public copyLink(link: string): void {
    this.clipboard.copy(link);
    this.toastrService.success(this.translateService.instant('FEATURES.ISSUES.LINK_COPIED_TO_CLIPBOARD'));
  }

  public openReportIssueAnalysisModal(): void {
    this.dialog.open(ReportIssueAnalysisComponent, {
      width: '500px',
      data: {
        issueId: this.activeIssue.id
      }
    });
  }
}
