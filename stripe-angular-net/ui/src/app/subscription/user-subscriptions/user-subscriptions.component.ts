import { Component, OnInit } from '@angular/core';
import { products } from 'src/app/product/product-lookup';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StripeDataService } from 'src/app/services/stripe-data.service';

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'quantity', 'canceled'];
  customerSubscription;
  products;

  constructor(
    private _authService: AuthenticationService,
    private _dataService: StripeDataService) {
      this.products = products;
  }

  ngOnInit(): void {
    this._dataService
      .getMySubscriptions()
      .subscribe(x => {
        this.customerSubscription = x;
        console.log(this.customerSubscription);
      }, err => {
        console.log('error-get-customer-subscriptions', err);
      });
  }

  getProductNameFromPriceId = (priceId) => 
    this.products.filter(p => p.priceId === priceId)[0].name;

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
