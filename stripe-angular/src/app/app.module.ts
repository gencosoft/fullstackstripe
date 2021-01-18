import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { HttpClientModule } from '@angular/common/http';
import { StripeMountComponent } from './stripe-mount/stripe-mount.component';
import { PaymentComponent } from './payment/payment.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    StripeMountComponent,
    PaymentComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51I3vwwCAVxkeCX4QWqibRQITeb9iG4wNPE7sW1Wzb8KitLSEawyI4BC8e31r8ysznVfjenkD55PMLNNG1jAAh2d800nOn5T4yc'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
