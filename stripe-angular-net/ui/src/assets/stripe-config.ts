import { StripeCardElementOptions, StripeElementsOptions } from "@stripe/stripe-js";

export const cardOptions: StripeCardElementOptions = {
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

export const elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };