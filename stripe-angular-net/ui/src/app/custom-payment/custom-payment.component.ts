import { Component, OnDestroy, OnInit } from '@angular/core';
import { StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';
import { Subscription } from 'rxjs';
import { cardOptions, elementsOptions } from 'src/assets/stripe-config';
import { Payment } from '../models/payment';
import { StripeDataService } from '../services/stripe-data.service';

@Component({
  selector: 'app-custom-payment',
  templateUrl: './custom-payment.component.html',
  styleUrls: ['./custom-payment.component.css']
})
export class CustomPaymentComponent implements OnInit, OnDestroy {

  quantity: number;
  cost: number;
  email: string;
  name: string;
  result: string;

  elements: StripeElements;
  card: StripeCardElement;
  subscription: Subscription;

  constructor(
    private stripeService: StripeService,
    private dataService: StripeDataService 
  ) {
    this.quantity = history.state.quantity,
    this.cost = history.state.cost;
  }

  ngOnInit(): void {
    this.stripeService.elements(elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', cardOptions);
          this.card.mount('#card-element');
        }
      });
  }

  createToken() {
    this.stripeService
      .createToken(this.card, { name: this.name })
      .subscribe((result) => {
        if (result.token) {
          let payment: Payment = {
            Token: result.token.id,
            Description: "Payment from angular custom-payment component.",
            Currency: "usd",
            Email: this.email,
            Amount: this.cost * this.quantity * 100
          };

          this.subscription = this.dataService
            .paymentFromToken(payment)
            .subscribe(x => {
              this.result = "Payment was successfully processed!";
            }, err => {
              this.result = "An error occured while trying to post the payment."
              console.log('error-token-create', err);
            });
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }
}
