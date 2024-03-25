import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IssuesService } from 'app/features/issues-dashboard/services/issues.service';
import { ReportIssueAnaliseDTO } from 'app/shared/interfaces/ReportIssueAnaliseDTO';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-issue-analysis-popup',
  templateUrl: './report-issue-analysis.component.html',
  styleUrls: ['./report-issue-analysis.component.scss'],
})
export class ReportIssueAnalysisComponent implements OnInit {
  public reportIssueAnalysisForm: FormGroup;
  public isSubmitted: boolean = false;
  private issueId: string;
  public get reasonControl(): AbstractControl {
    return this.reportIssueAnalysisForm.get('reason');
  }

  constructor(
    public dialogRef: MatDialogRef<ReportIssueAnalysisComponent>,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private issueService: IssuesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.issueId = this.data.issueId;
  }

  public submitContact(): void {
    this.isSubmitted = true;
    this.reportIssueAnalysisForm.markAsDirty();
    this.reportIssueAnalysisForm.markAllAsTouched();
    if (this.reportIssueAnalysisForm.valid) {
      this.toastrService.success(
        this.translateService.instant(
          'FEATURES.ISSUES.REPORT_REASON_SUCCESSFULLY_SEND'
        )
      );
      this.issueService
        .reportIssueAnalise(
          this.issueId,
          new ReportIssueAnaliseDTO(
            this.reportIssueAnalysisForm.value.reason,
            this.reportIssueAnalysisForm.value.shouldDelete,
          )
        )
        .subscribe((res) => {
          this.toastrService.success(
            this.translateService.instant(
              'FEATURES.ISSUES.REPORT_REASON_SUCCESSFULLY_SEND'
            )
          );
          this.close();
        });
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  private initForm(): void {
    this.reportIssueAnalysisForm = new FormGroup({
      reason: new FormControl(null, [Validators.required]),
      shouldDelete: new FormControl(null, )
    });
  }
}
