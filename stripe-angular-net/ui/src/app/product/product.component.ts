import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StripeService } from 'ngx-stripe';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { StripeDataService } from '../services/stripe-data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnDestroy{
  @Input() product: Product;
  @Input("is-prebuild") isPrebuild: boolean;
  subscription: Subscription;

  constructor(
    private _router: Router,
    private _stripeService: StripeService,
    private _dataService: StripeDataService
    ) {
    this.product = {
      ProductName: 'Apple Iphone',
      ProductDescription: '11 iPhone Green Mint',
      ProductImageUrl: 'https://images.unsplash.com/photo-1592910147752-5e0bc5f04715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
      Amount: 400,
      Quantity: 0
    };
    this.isPrebuild = 
      window.location.href.split('/')[window.location.href.split('/').length - 1] == 'prebuild-checkout'
  }

  add(){
    this.product.Quantity ++;
  }

  remove(){
    if(this.product.Quantity > 0) this.product.Quantity --;
  }

  proceed(){
    if(this.isPrebuild){ 
      this.subscription = this._dataService
        .createPaymentSession(this.product)
        .subscribe(x => {
          this._stripeService.redirectToCheckout({sessionId: x.id})
            .subscribe(x => {
            }, err => {
              console.log('error-prebuild-session', err);
            });
        }, err => {
          console.log('error-prebuild-session', err);
        });
    } else{
      this._router.navigate(['/custom-payment'], {state:{quantity: this.product.Quantity, cost: this.product.Amount}});
    }
  }
  
  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }
}
