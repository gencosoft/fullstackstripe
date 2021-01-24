import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPaymentComponent } from './custom-payment/custom-payment.component';
import { CancelComponent } from './prebuild-checkout/cancel/cancel.component';
import { SuccessComponent } from './prebuild-checkout/success/success.component';
import { ProductComponent } from './product/product.component';
import { SubscribeCancelComponent } from './subscription/subscribe-cancel/subscribe-cancel.component';
import { SubscribeSuccessComponent } from './subscription/subscribe-success/subscribe-success.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  { path: '', component: ProductComponent},
  { path: 'product', component: ProductComponent},
  { path: 'prebuild-checkout', component: ProductComponent},
  { path: 'prebuild-checkout/success', component: SuccessComponent},
  { path: 'prebuild-checkout/cancel', component: CancelComponent},
  { path: 'custom-payment', component: CustomPaymentComponent},
  { path: 'subscription', component: SubscriptionComponent},
  { path: 'subscription/success', component: SubscribeSuccessComponent},
  { path: 'subscription/cancel', component: SubscribeCancelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
