import { Component } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-custom-flow',
  templateUrl: './custom-flow.component.html',
  styleUrls: ['./custom-flow.component.css']
})
export class CustomFlowComponent{
  product: Product;

  constructor() { 
    this.product = {
      ProductName: 'Succulent Pot',
      ProductDescription: 'Green Succulent Pot',
      ProductImageUrl: 'https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
      Amount: 20,
      Quantity: 0
    };
  }
}
