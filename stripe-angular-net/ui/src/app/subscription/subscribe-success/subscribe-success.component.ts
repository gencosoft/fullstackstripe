import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StripeDataService } from 'src/app/services/stripe-data.service';

@Component({
  selector: 'app-subscribe-success',
  templateUrl: './subscribe-success.component.html',
  styleUrls: ['./subscribe-success.component.css']
})
export class SubscribeSuccessComponent implements OnInit, OnDestroy {

  sessionId: string;
  customerId: string;
  subscription: Subscription

  constructor(
    private _route: ActivatedRoute,
    private _dataService: StripeDataService) {
    this.sessionId =  this._route.snapshot.queryParams.sessionId;
  }

  ngOnInit(): void {
    this._dataService
      .getSubscriptionSession(this.sessionId)
      .subscribe(x => {
        console.log('session', x);
        this.customerId = x.customerId;
      }, err => {
        console.log('error-get-subscription-session', err);
      });
  }

  manageBilling(){
    this.subscription = this._dataService
      .createCustomerPortalSession({SessionId: this.sessionId})
      .subscribe(x => {
        console.log('portal-session', x);
        window.location.href = x.url;
      }, err => {
        console.log('error-create-portal-session', err);
      });
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }
}
