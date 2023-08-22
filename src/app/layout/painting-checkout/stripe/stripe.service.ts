import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StripeElements, loadStripe } from '@stripe/stripe-js';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CREATE_PAYMENT_INTENT_RESPONSE, PAYMENT_INTENT, UPDATE_PAYMENT_INTENT_RESPONSE } from '../ordering-steps/payment/payment.model';
import { ErrorDialogService } from 'src/app/shared-services/error-dialog/error-dialog.service';
import { Router } from '@angular/router';
import { CHECKOUT_ERROR, PAYMENT_SERVICE_ERROR } from 'src/app/api-error-messages.constants';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  elements: StripeElements | undefined;
  stripeElements$ = new BehaviorSubject<StripeElements | undefined>(undefined);
  private paymentIntent: PAYMENT_INTENT;

  constructor(private httpClient: HttpClient,
    private errorDialogService: ErrorDialogService,
    private router: Router) { }

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
          this.paymentIntent = (response as CREATE_PAYMENT_INTENT_RESPONSE).body;
          return this.paymentIntent.client_secret;
        }),
        catchError( error => {
          this.errorDialogService.open(CHECKOUT_ERROR);
          this.router.navigate(['/gallery']);
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

  updatePaymentIntent(price: number, paintingImageName: string) {
    let requestBody = {
      "painting": paintingImageName,
      "updatedPrice": price,
      "paymentIntentId": this.paymentIntent.paymentIntentId
  }
  
  let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(
      environment.updatePaymentIntentEndpoint, requestBody, {'headers':headers}).pipe(
        map((response) => {
          return response as UPDATE_PAYMENT_INTENT_RESPONSE;
        }),
        catchError( error => {
          this.errorDialogService.open(PAYMENT_SERVICE_ERROR);
          this.router.navigate(['/checkout','payment']);
          return throwError(() => error)
        })
    )
  }
}
