import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeCardCvcElement, StripeCardElementOptions, StripeCardExpiryElement, StripeCardNumberElement, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  elements: StripeElements;
  cardNumber: StripeCardNumberElement;
  cardExpiry: StripeCardExpiryElement;
  cardCvc: StripeCardCvcElement;
  
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
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      name: ['', [Validators.required]],
      sameAddress: [''],
      saveInfo: [''],
      ccName: ['', [Validators.required]],
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.cardNumber) {
          console.log('mounting-initiated');
          this.cardNumber = this.elements.create('cardNumber', this.cardOptions);
          this.cardNumber.mount('#ccNumber');
          this.cardExpiry = this.elements.create('cardExpiry', this.cardOptions);
          this.cardExpiry.mount('#ccExpiration');
          this.cardCvc = this.elements.create('cardCvc', this.cardOptions);
          this.cardCvc.mount('#ccCvc');
        }
      });
  }

  createToken() {
    const name = this.form.get('ccName').value;
    this.stripeService
      .createToken(this.cardNumber, { name })
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
