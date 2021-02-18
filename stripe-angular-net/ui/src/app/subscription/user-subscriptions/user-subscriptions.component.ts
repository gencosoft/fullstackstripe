import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StripeDataService } from 'src/app/services/stripe-data.service';

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {
  customerSubscription;

  constructor(
    private _authService: AuthenticationService,
    private _dataService: StripeDataService) { }

  ngOnInit(): void {
    this._dataService
      .getMySubscriptions()
      .subscribe(x => {
        this.customerSubscription = x;
      }, err => {
        console.log('error-get-customer-subscriptions', err);
      });
  }

  manageSubscription(){
    let user = this._authService.getUser();
    this._dataService
      .createCustomerPortalSession({CustomerId: user.id})
      .subscribe(x => {
        window.location.href = x.url;
      }, err => {
        console.log('error-create-portal-session', err);
      });
  }

}
