import { Component, OnDestroy } from '@angular/core';
import { StripeService } from 'ngx-stripe';
import { Subscription } from 'rxjs';
import { products } from 'src/app/product/product-lookup';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StripeDataService } from 'src/app/services/stripe-data.service';

@Component({
  selector: 'app-subscription-options',
  templateUrl: './subscription-options.component.html',
  styleUrls: ['./subscription-options.component.css']
})
export class SubscriptionOptionsComponent implements OnDestroy{
  subscription: Subscription;
  products;

  constructor(
    private _authService: AuthenticationService,
    private _stripeService: StripeService,
    private _dataService: StripeDataService) {
    this.products = products;
  }

  subscribe(priceId){
    let user = this._authService.getUser();
    
    this.subscription = this._dataService
      .createSubscriptionSession({PriceId: priceId, CustomerId: user.id})
      .subscribe(x => {
        this._stripeService.redirectToCheckout({sessionId: x.sessionId})
          .subscribe(x => {
          }, err => {
            console.log('error-redirec-subscription-session', err);
          });
      }, err => {
        console.log('error-create-subscription-session', err);
      });
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }
}

