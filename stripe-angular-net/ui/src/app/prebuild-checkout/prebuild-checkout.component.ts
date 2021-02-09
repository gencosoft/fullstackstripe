import { Component } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-prebuild-checkout',
  templateUrl: './prebuild-checkout.component.html',
  styleUrls: ['./prebuild-checkout.component.css']
})
export class PrebuildCheckoutComponent {
  product: Product;

  constructor() { 
    this.product = {
      ProductName: 'Apple Iphone',
      ProductDescription: '11 iPhone Green Mint',
      ProductImageUrl: 'https://images.unsplash.com/photo-1592910147752-5e0bc5f04715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
      Amount: 400,
      Quantity: 0
    };
  }
}
