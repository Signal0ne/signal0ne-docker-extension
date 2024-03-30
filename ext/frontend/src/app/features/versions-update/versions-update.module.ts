import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';
import {
  PaymentCancelComponent
} from 'app/features/versions-update/containers/payment-cancel/payment-cancel.component';
import {
  PaymentSuccessComponent
} from 'app/features/versions-update/containers/payment-success/payment-success.component';
import { VersionsUpdateRoutingModule } from 'app/features/versions-update/versions-update-routing.module';
import { SharedModule } from 'app/shared/SharedModule';

@NgModule({
  declarations: [
    PaymentSuccessComponent,
    PaymentCancelComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    VersionsUpdateRoutingModule,
    NgbModule,
    MatTooltipModule,
    SvgIconComponent
  ],
  exports: []
})
export class VersionsUpdateModule {
}
