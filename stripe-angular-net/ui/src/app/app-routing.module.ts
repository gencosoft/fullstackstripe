import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomFlowComponent } from './custom-flow/custom-flow.component';
import { CustomPaymentComponent } from './custom-payment/custom-payment.component';
import { CancelComponent } from './prebuild-checkout/cancel/cancel.component';
import { PrebuildCheckoutComponent } from './prebuild-checkout/prebuild-checkout.component';
import { SuccessComponent } from './prebuild-checkout/success/success.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SubscribeCancelComponent } from './subscription/subscribe-cancel/subscribe-cancel.component';
import { SubscribeSuccessComponent } from './subscription/subscribe-success/subscribe-success.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  { path: '', component: CustomFlowComponent},
  { path: 'custom-flow', component: CustomFlowComponent},
  { path: 'prebuild-checkout', component: PrebuildCheckoutComponent},
  { path: 'prebuild-checkout/success', component: SuccessComponent},
  { path: 'prebuild-checkout/cancel', component: CancelComponent},
  { path: 'custom-payment', component: CustomPaymentComponent},
  { path: 'subscription', component: SubscriptionComponent},
  { path: 'subscription/success', component: SubscribeSuccessComponent},
  { path: 'subscription/cancel', component: SubscribeCancelComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
