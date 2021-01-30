import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StripeService } from 'ngx-stripe';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { StripeDataService } from '../../services/stripe-data.service';

@Component({
  selector: 'app-product-2',
  templateUrl: './product-2.component.html',
  styleUrls: ['./product-2.component.css']
})
export class Product2Component {
  name: string;
  description: string;
  quantity: number;
  amount: number;
  isPrebuild: boolean;
  subscription: Subscription;

  constructor(
    private _router: Router,
    private _stripeService: StripeService,
    private _dataService: StripeDataService
    ) {
    this.name = 'Succulent Pot';
    this.description = 'Green Succulent Pot';
    this.quantity = 0;
    this.amount = 20;
    this.isPrebuild = 
      window.location.href.split('/')[window.location.href.split('/').length - 1] == 'prebuild-checkout'
  }

  add(){
    this.quantity ++;
  }

  remove(){
    if(this.quantity > 0) this.quantity --;
  }

  proceed(){
    if(this.isPrebuild){
      let product: Product = {
        ProductName: this.name,
        ProductDescription: this.description,
        ProductImageUrl: 'https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
        Amount: this.amount,
        Quantity: this.quantity
      };

      this.subscription = this._dataService
        .createPaymentSession(product)
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
      this._router.navigate(['/custom-payment'], {state:{quantity: this.quantity, cost: this.amount}});
    }
  }
}
