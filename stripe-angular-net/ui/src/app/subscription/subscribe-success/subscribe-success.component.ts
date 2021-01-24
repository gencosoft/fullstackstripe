import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StripeService } from 'ngx-stripe';
import { Subscription } from 'rxjs';
import { StripeDataService } from 'src/app/services/stripe-data.service';

@Component({
  selector: 'app-subscribe-success',
  templateUrl: './subscribe-success.component.html',
  styleUrls: ['./subscribe-success.component.css']
})
export class SubscribeSuccessComponent implements OnInit, OnDestroy {

  customerId;
  sessionId: string;
  subscription: Subscription

  constructor(
    private _route: ActivatedRoute,
    private _stripeService: StripeService,
    private _dataService: StripeDataService) {
    this.sessionId =  this._route.snapshot.queryParams.sessionId;
  }

  ngOnInit(): void {
    this._dataService
      .getSubscriptionSession(this.sessionId)
      .subscribe(x => {
        console.log('session', x);
        this.customerId = x.customerId;
      });
  }

  manageBilling(){
    
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }
}
