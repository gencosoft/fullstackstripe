import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CustomPaymentComponent } from './custom-payment/custom-payment.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SuccessComponent } from './prebuild-checkout/success/success.component';
import { CancelComponent } from './prebuild-checkout/cancel/cancel.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SubscribeCancelComponent } from './subscription/subscribe-cancel/subscribe-cancel.component';
import { SubscribeSuccessComponent } from './subscription/subscribe-success/subscribe-success.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SubscriptionOptionsComponent } from './subscription/subscription-options/subscription-options.component';
import { PrebuildCheckoutComponent } from './prebuild-checkout/prebuild-checkout.component';
import { CustomFlowComponent } from './custom-flow/custom-flow.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSubscriptionsComponent } from './subscription/user-subscriptions/user-subscriptions.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomPaymentComponent,
    SubscriptionComponent,
    SuccessComponent,
    CancelComponent,
    SubscribeCancelComponent,
    SubscribeSuccessComponent,
    LoginComponent,
    SubscriptionOptionsComponent,
    PrebuildCheckoutComponent,
    CustomFlowComponent,
    ProductComponent,
    ProfileComponent,
    UserSubscriptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51I3vwwCAVxkeCX4QWqibRQITeb9iG4wNPE7sW1Wzb8KitLSEawyI4BC8e31r8ysznVfjenkD55PMLNNG1jAAh2d800nOn5T4yc'),
    SocialLoginModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatChipsModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44356", "gencosoft-paymentapi.azurewebsites.net"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '730331897127-mgfpe7rkcgi1u9j28adpl321i75s0eo8.apps.googleusercontent.com'
            )
          },
        ],
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
