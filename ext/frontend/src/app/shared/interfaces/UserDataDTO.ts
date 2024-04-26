export class UserDataDTO {
  constructor(public id: number, public userName: string, public isPro: boolean = false, public canRateApplication = false) {
  }
}