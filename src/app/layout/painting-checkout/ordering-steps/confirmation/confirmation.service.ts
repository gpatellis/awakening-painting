import { Injectable } from '@angular/core';
import { StripeService } from '../../stripe/stripe.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { SHIPPING_LABEL_AND_CONFIRMATION_EMAIL_RESPONSE, STRIPE_PAYMENT_CONFIRMATION_ERROR, STRIPE_PAYMENT_CONFIRMATION_RESPONSE, UPDATE_SOLD_PAINTING_RESPONSE } from './confirmation.model';
import { ErrorDialogService } from 'src/app/shared-services/error-dialog/error-dialog.service';
import { CARD_DECLINED_ERROR, CARD_PROCESSING_ERROR, EXPIRED_CARD_ERROR, INCORRECT_CVC_ERROR, INCORRECT_NUMBER_ERROR, PAYMENT_ERROR } from 'src/app/api-error-messages.constants';
import { PaintingCheckoutService } from '../../painting-checkout.service';
import { ShippingService } from '../shipping/shipping.service';
import { SHIPPING_LABEL_AND_CONFIRMATION_EMAIL_ERROR, SHIPPING_LABEL_AND_CONFIRMATION_EMAIL_SUCCESS, STRIPE_PAYMENT_CONSOLE_ERROR, STRIPE_PAYMENT_SUCCESS, UPDATE_SOLD_PAINTING } from './confirmation.constants';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  
  constructor(
    private httpClient: HttpClient,
    private stripeService: StripeService,
    private errorDialogService: ErrorDialogService,
    private paintingCheckoutService: PaintingCheckoutService,
    private shippingService: ShippingService,
    private loadingIndicatorService: LoadingIndicatorService,
    private router: Router) { }

  checkStripePaymentResponse(stripePaymentConfirmationResponse: STRIPE_PAYMENT_CONFIRMATION_RESPONSE): void {
    if(stripePaymentConfirmationResponse.paymentIntent?.status == STRIPE_PAYMENT_SUCCESS) { 
      this.completeOrder();
    } else {
      this.loadingIndicatorService.hide();
      this.errorDialogService.open(PAYMENT_ERROR, STRIPE_PAYMENT_CONSOLE_ERROR);
    }
  }

  processStripePaymentConfirmationError(error: STRIPE_PAYMENT_CONFIRMATION_ERROR): void {
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
    this.updateSoldPainting(UPDATE_SOLD_PAINTING.available).subscribe();
  }

  updateSoldPainting(update: UPDATE_SOLD_PAINTING): Observable<UPDATE_SOLD_PAINTING_RESPONSE> {
    const requestBody =  {
      "paintingImage": this.paintingCheckoutService.paintingChosenForPurchaseWithoutImage.image,
      "update": update
    };
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(
      environment.updateSoldPaintingEndpoint, requestBody, {'headers':headers}).pipe(
        map((response) => {
          return response as UPDATE_SOLD_PAINTING_RESPONSE;
        }),
        catchError( error => {
          this.loadingIndicatorService.hide();
          if(update == UPDATE_SOLD_PAINTING.sold)
            this.errorDialogService.open(PAYMENT_ERROR, error);
          return throwError(() => error)
        })
      )
  }

  completeOrder(): void {
    this.createShippingLabelAndConfirmationEmail().subscribe((result: SHIPPING_LABEL_AND_CONFIRMATION_EMAIL_RESPONSE) => {
      if(result.status != SHIPPING_LABEL_AND_CONFIRMATION_EMAIL_SUCCESS) {
        console.error(SHIPPING_LABEL_AND_CONFIRMATION_EMAIL_ERROR);
      }
      this.navigateToOrderSummaryPage();
    });
  }

  navigateToOrderSummaryPage(): void {
    this.router.navigate(['/checkout','order-summary']);
    this.loadingIndicatorService.hide();
  }

  createShippingLabelAndConfirmationEmail(): Observable<SHIPPING_LABEL_AND_CONFIRMATION_EMAIL_RESPONSE> {
    const requestBody = {
      "paymentConfirmationData": this.stripeService.getPaymentDataFromSessionStorage(),
      "shippingAddress": this.shippingService.getShippingAddressFromSessionStorage(),
      "paintingName": this.paintingCheckoutService.paintingChosenForPurchaseWithoutImage.name
    }
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(
      environment.createShippingLabelAndConfirmationEmailEndpoint, requestBody, {'headers':headers}).pipe(
        map((response) => {
          return response as SHIPPING_LABEL_AND_CONFIRMATION_EMAIL_RESPONSE;
        }),
        catchError( error => {
          this.navigateToOrderSummaryPage();
          return throwError(() => error)
        })
      )
  }

}
