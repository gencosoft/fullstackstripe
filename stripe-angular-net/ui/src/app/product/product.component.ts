import { Component } from '@angular/core';
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
export class ProductComponent {
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
    this.name = 'Running Shoe';
    this.description = 'Unpaired gray nike running shoe';
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
        Amount: this.amount,
        Quantity: this.quantity
      };

      this.subscription = this._dataService
        .createSession(product)
        .subscribe(x => {
          console.log('prebuild-session-result', x);
          this._stripeService.redirectToCheckout({sessionId: x.id})
            .subscribe(x => {
              console.log('success-prebuild-session');
            }, err => {
              console.log('error-prebuild-session', err);
            });
        }, err => {
          console.log('error-prebuild-session', err);
        });
      //this.stripeService.redirectToCheckout({sessionId: sessionId})
    } else{
      this._router.navigate(['/custom-payment'], {state:{quantity: this.quantity, cost: this.amount}});
    }
  }
}
