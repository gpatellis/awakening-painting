import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CREATE_PAYMENT_INTENT_RESPONSE } from './payment.model';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  constructor(private httpClient: HttpClient) {
   }

   createPaymentIntent(price: number, paintingImageName: string) {
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
    )};

}
