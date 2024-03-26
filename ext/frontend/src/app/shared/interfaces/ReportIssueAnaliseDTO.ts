export class ReportIssueAnaliseDTO {
  public constructor(
    public reason: string,
    public shouldDelete: boolean) {
  }
}