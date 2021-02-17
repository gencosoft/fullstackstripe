import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { Product } from '../models/product';
import { SubscriptionSession } from '../models/subscription-session';

@Injectable({
  providedIn: 'root'
})
export class StripeDataService {

  constructor(private http: HttpClient) { }

  paymentFromToken(payment: Payment): Observable<any>{
    return this.http.post(environment.baseApiUrl + '/stripe/token', payment);
  }

  createPaymentSession(product: Product): Observable<any>{
    return this.http.post(environment.baseApiUrl + '/stripe/payment-session', product);
  }

  createSubscriptionSession(data: SubscriptionSession): Observable<any>{
    return this.http.post(environment.baseApiUrl + '/stripe/subscription-session', data);
  }

  getSubscriptionSession(sessionId): Observable<any>{
    return this.http.get(environment.baseApiUrl + '/stripe/subscription-session?sessionId=' + sessionId);
  }

  createCustomerPortalSession(customerId): Observable<any>{
    return this.http.post(environment.baseApiUrl + '/stripe/customer-portal', customerId);
  }

  getCustomerSubscriptions(customerId): Observable<any>{
    return this.http.get(environment.baseApiUrl + '/stripe/subscriptions/' + customerId);
  }
}
