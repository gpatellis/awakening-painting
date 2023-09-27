import { Injectable } from '@angular/core';
import { StripeService } from '../../stripe/stripe.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription, catchError, map, of, throwError } from 'rxjs';
import { STRIPE_PAYMENT_CONFIRMATION_ERROR, STRIPE_PAYMENT_CONFIRMATION_RESPONSE, UPDATE_SOLD_PAINTING_RESPONSE } from './confirmation.model';
import { ErrorDialogService } from 'src/app/shared-services/error-dialog/error-dialog.service';
import { CARD_DECLINED_ERROR, CARD_PROCESSING_ERROR, EXPIRED_CARD_ERROR, INCORRECT_CVC_ERROR, INCORRECT_NUMBER_ERROR, ORDER_ERROR, PAINTING_ALREADY_SOLD, PAYMENT_ERROR } from 'src/app/api-error-messages.constants';
import { PaintingCheckoutService } from '../../painting-checkout.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  
  constructor(
    private httpClient: HttpClient,
    private stripeService: StripeService,
    private errorDialogService: ErrorDialogService,
    private paintingCheckoutService: PaintingCheckoutService) { }

  processOrder(stripePaymentConfirmationResponse: STRIPE_PAYMENT_CONFIRMATION_RESPONSE) {
    if(stripePaymentConfirmationResponse.status == "succeeded") { //enums
      this.updateSoldPainting().subscribe((response: UPDATE_SOLD_PAINTING_RESPONSE) => {
        if(response.update == "Successfull") {
        } else if (response.update == "Painting Already Sold") {
          this.errorDialogService.open(PAINTING_ALREADY_SOLD);
        }
      }); 
    } else {
      this.errorDialogService.open(PAYMENT_ERROR, 'stripePaymentConfirmationResponse.status does not say succeeded');
    }
  
  }

  processStripePaymentConfirmationError(error: STRIPE_PAYMENT_CONFIRMATION_ERROR) {
    switch(error.code) { 
      case "card_declined": { 
         this.errorDialogService.open(CARD_DECLINED_ERROR, error)
         break; 
      } 
      case "expired_card": { 
        this.errorDialogService.open(EXPIRED_CARD_ERROR, error)
        break; 
      }
      case "incorrect_cvc": { 
        this.errorDialogService.open(INCORRECT_CVC_ERROR, error)
        break; 
      }
      case "processing_error": { 
        this.errorDialogService.open(CARD_PROCESSING_ERROR, error)
        break; 
      } 
      case "incorrect_number": { 
        this.errorDialogService.open(INCORRECT_NUMBER_ERROR, error)
        break; 
      } 
      default: { 
         this.errorDialogService.open(PAYMENT_ERROR, error); 
         break; 
      } 
   } 
  }

  updateSoldPainting(): Observable<UPDATE_SOLD_PAINTING_RESPONSE> {
    const requestBody =  JSON.parse(`{
      "paintingImage": "${this.paintingCheckoutService.paintingChosenForPurchaseWithoutImage.image}"
    }`);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(
      environment.updateSoldPaintingEndpoint, requestBody, {'headers':headers}).pipe(
        map((response) => {
          return response as UPDATE_SOLD_PAINTING_RESPONSE;
        }),
        catchError( error => {
          this.errorDialogService.open(ORDER_ERROR, error);
          return throwError(() => error)
        })
      )
  }

}
