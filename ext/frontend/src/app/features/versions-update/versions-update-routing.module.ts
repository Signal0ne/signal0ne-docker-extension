import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  PaymentCancelComponent
} from 'app/features/versions-update/containers/payment-cancel/payment-cancel.component';
import {
  PaymentSuccessComponent
} from 'app/features/versions-update/containers/payment-success/payment-success.component';

const routes: Routes = [
  { path: 'cancel', component: PaymentCancelComponent },
  { path: 'success', component: PaymentSuccessComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class VersionsUpdateRoutingModule {
}
