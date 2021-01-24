import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { Product } from '../models/product';
import { SubscriptionSession } from '../models/subscription-session';

@Injectable({
  providedIn: 'root'
})
export class StripeDataService {

  baseUrl = 'https://localhost:44356/api/stripe';

  constructor(private http: HttpClient) { }

  paymentFromToken(payment: Payment): Observable<any>{
    return this.http.post(this.baseUrl + '/token', payment);
  }

  createPaymentSession(product: Product): Observable<any>{
    return this.http.post(this.baseUrl + '/payment-session', product);
  }

  createSubscriptionSession(data: SubscriptionSession): Observable<any>{
    return this.http.post(this.baseUrl + '/subscription-session', data);
  }

  getSubscriptionSession(sessionId): Observable<any>{
    return this.http.get(this.baseUrl + '/subscription-session?sessionId=' + sessionId);
  }
}
