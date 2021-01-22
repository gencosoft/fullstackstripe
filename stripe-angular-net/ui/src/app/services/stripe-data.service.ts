import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class StripeDataService {

  baseUrl = 'https://localhost:44356/api/stripe';

  constructor(private http: HttpClient) { }

  paymentFromToken(payment: Payment): Observable<any>{
    return this.http.post(this.baseUrl + '/token', payment);
  }

  createSession(product: Product): Observable<any>{
    console.log('product', product);
    return this.http.post(this.baseUrl + '/session', product);
  }
}
