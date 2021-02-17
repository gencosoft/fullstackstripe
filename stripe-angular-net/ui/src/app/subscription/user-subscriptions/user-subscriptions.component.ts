import { Component, OnInit } from '@angular/core';
import { CustomerSubscriptions } from 'src/app/models/customer-subscriptions';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StripeDataService } from 'src/app/services/stripe-data.service';

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {

  user;
  customerSubscription: CustomerSubscriptions;

  constructor(
    private _authService: AuthenticationService,
    private _dataService: StripeDataService) { }

  ngOnInit(): void {
    this.user = this._authService.getUser();
    
    this._dataService
      .getCustomerSubscriptions(this.user.id)
      .subscribe(x => {
        this.customerSubscription = x;
      }, err => {
        console.log('error-get-customer-subscriptions', err);
      });
  }

  manageSubscription(){
    this._dataService
      .createCustomerPortalSession({CustomerId: this.user.id})
      .subscribe(x => {
        window.location.href = x.url;
      }, err => {
        console.log('error-create-portal-session', err);
      });
  }

}
