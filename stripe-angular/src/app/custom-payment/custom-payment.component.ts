import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeCardElement, StripeCardElementOptions, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-custom-payment',
  templateUrl: './custom-payment.component.html',
  styleUrls: ['./custom-payment.component.css']
})
export class CustomPaymentComponent implements OnInit, AfterViewInit {

  cost: number;
  quantity: number;
  email: string;
  name: string;

  elements: StripeElements;
  card: StripeCardElement;
  
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  form: FormGroup;

  constructor(
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.cost = 100;
    this.quantity = 5;

    
  }

  ngAfterViewInit(): void{
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          console.log('enters')
          this.card = this.elements.create('card', this.cardOptions);
          this.card.mount('#card-element');
        }
      });
  }

  createToken() {
    this.stripeService
      .createToken(this.card, { name: this.name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
  

  
}
