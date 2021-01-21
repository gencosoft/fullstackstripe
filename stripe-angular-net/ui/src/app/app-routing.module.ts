import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPaymentComponent } from './custom-payment/custom-payment.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { PrebuildCheckoutComponent } from './prebuild-checkout/prebuild-checkout.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'prebuild-checkout', component: PrebuildCheckoutComponent},
  { path: 'custom-payment', component: CustomPaymentComponent},
  { path: 'subscription', component: SubscriptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
