import { Component, OnDestroy } from '@angular/core';
import { StripeService } from 'ngx-stripe';
import { Subscription } from 'rxjs';
import { StripeDataService } from 'src/app/services/stripe-data.service';

@Component({
  selector: 'app-subscription-options',
  templateUrl: './subscription-options.component.html',
  styleUrls: ['./subscription-options.component.css']
})
export class SubscriptionOptionsComponent implements OnDestroy{

  costBasic: number;
  costPremium: number;
  costEnterprise: number;

  subscription: Subscription;

  constructor(
    private _stripeService: StripeService,
    private _dataService: StripeDataService) {
    this.costBasic = 5;
    this.costPremium = 25;
    this.costEnterprise = 100; 
  }

  subscribeEnterprise(){
    let priceId = 'price_1ICygjCAVxkeCX4QvDRLS7BL';
    this.subscribe(priceId);
  }

  subscribePremium(){
    let priceId = 'price_1ICyfOCAVxkeCX4QUAKvgia1';
    this.subscribe(priceId);
  }

  subscribeBasic(){
    let priceId = 'price_1ICycACAVxkeCX4QIwU9pQHV';
    this.subscribe(priceId);
  }

  subscribe(priceId){
    this.subscription = this._dataService
      .createSubscriptionSession({PriceId: priceId})
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

