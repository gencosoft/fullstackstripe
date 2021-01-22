import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { HttpClientModule } from '@angular/common/http';
import { PaymentComponent } from './payment/payment.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { ProductComponent } from './product/product.component';
import { CustomPaymentComponent } from './custom-payment/custom-payment.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SuccessComponent } from './prebuild-checkout/success/success.component';
import { CancelComponent } from './prebuild-checkout/cancel/cancel.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    NavbarComponent,
    ProductComponent,
    CustomPaymentComponent,
    SubscriptionComponent,
    SuccessComponent,
    CancelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51I3vwwCAVxkeCX4QWqibRQITeb9iG4wNPE7sW1Wzb8KitLSEawyI4BC8e31r8ysznVfjenkD55PMLNNG1jAAh2d800nOn5T4yc'),
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
