import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StripeElements, loadStripe } from '@stripe/stripe-js';
import { BehaviorSubject, Observable, Subject, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CREATE_PAYMENT_INTENT_RESPONSE } from '../ordering-steps/payment/payment.model';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  elements: StripeElements | undefined;
  stripeElements$ = new BehaviorSubject<StripeElements | undefined>(undefined);

  constructor(private httpClient: HttpClient) { }

  createPaymentIntent(price: number, paintingImageName: string): Observable<string> {
    let requestBody = {
        "painting": paintingImageName,
        "price": price
    }
    
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(
      environment.createPaymentIntentEndpoint, requestBody, {'headers':headers}).pipe(
        map((response) => {
          return (response as CREATE_PAYMENT_INTENT_RESPONSE).body.client_secret;
        }),
        catchError( error => {
          return throwError(() => error)
        })
    )
  };

  async getStripeElements(price: number, paintingImageName: string): Promise<void> {
    this.createPaymentIntent(price,paintingImageName).subscribe(async (client_secret) => {
      const appearance = {
        variables: {
          fontFamily: 'Gill Sans, sans-serif',
        }
      };
      const paymentOptions = {
        clientSecret: client_secret,
        appearance: appearance
      };
      let stripe = await loadStripe(environment.stripe.publicKey);
      let elements = stripe?.elements(paymentOptions);
      this.stripeElements$.next(elements);
    })
  }
}
