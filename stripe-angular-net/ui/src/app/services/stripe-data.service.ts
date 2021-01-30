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
    return this.http.post(environment.baseApiUrl + '/token', payment);
  }

  createPaymentSession(product: Product): Observable<any>{
    return this.http.post(environment.baseApiUrl + '/payment-session', product);
  }

  createSubscriptionSession(data: SubscriptionSession): Observable<any>{
    return this.http.post(environment.baseApiUrl + '/subscription-session', data);
  }

  getSubscriptionSession(sessionId): Observable<any>{
    return this.http.get(environment.baseApiUrl + '/subscription-session?sessionId=' + sessionId);
  }

  createCustomerPortalSession(sessionId): Observable<any>{
    return this.http.post(environment.baseApiUrl + '/customer-portal', sessionId);
  }
}
