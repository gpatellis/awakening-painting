import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StripeElements, loadStripe } from '@stripe/stripe-js';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CREATE_PAYMENT_INTENT_RESPONSE, PAYMENT_CONFRIMATION_DATA, PAYMENT_INTENT, PAYMENT_INTENT_UPDATE, PAYMENT_METHOD_RESPONSE, UPDATE_PAYMENT_INTENT_RESPONSE } from '../ordering-steps/payment/payment.model';
import { ErrorDialogService } from 'src/app/shared-services/error-dialog/error-dialog.service';
import { Router } from '@angular/router';
import { CHECKOUT_ERROR, PAYMENT_SERVICE_ERROR } from 'src/app/api-error-messages.constants';
import { PaintingData } from '../../gallery/gallery-interfaces';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';
import { CARRIER_RATE } from '../ordering-steps/shipping/shipping.model';
import { ShippingService } from '../ordering-steps/shipping/shipping.service';
import { ConfirmationService } from '../ordering-steps/confirmation/confirmation.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  elements: StripeElements;
  stripeElements$ = new BehaviorSubject<StripeElements | undefined>(undefined);
  private paymentIntent: PAYMENT_INTENT;
  paymentConfirmationData: PAYMENT_CONFRIMATION_DATA;
  stripe: any;

  constructor(private httpClient: HttpClient,
    private errorDialogService: ErrorDialogService,
    private router: Router,
    private loadingIndicatorService: LoadingIndicatorService,
    private shippingService: ShippingService,
    private confirmationService: ConfirmationService) { }

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
        appearance: appearance,
        paymentMethodCreation: 'manual'
      };

      let stripe = await loadStripe(environment.stripe.publicKey);

      if(stripe)
        this.stripe = stripe;
      else
        this.paymentServiceError('loadStripe() did not return stripe');

      let elements = this.stripe?.elements(paymentOptions);
      if (elements)
        this.elements = elements;
      else
        this.paymentServiceError('stripe.elements() did not return elements');

      this.stripeElements$.next(this.elements);
    })
  }

  updatePaymentIntent(price: number, paintingImageName: string): Observable<PAYMENT_INTENT_UPDATE> {
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
          return (response as UPDATE_PAYMENT_INTENT_RESPONSE).body;
        }),
        catchError( error => {
          this.errorDialogService.open(PAYMENT_SERVICE_ERROR);
          this.router.navigate(['/checkout','payment']);
          this.loadingIndicatorService.hide();
          return throwError(() => error)
        })
    )
  }

  async proccessPaymentData(carrierRateSelected: CARRIER_RATE, paintingDataWithoutImage: PaintingData): Promise<void> {
    this.loadingIndicatorService.show();
    let updatedStripePrice = Number(((carrierRateSelected.shipping_amount.amount + paintingDataWithoutImage.price) * 100).toFixed(0));
    this.updatePaymentIntent(updatedStripePrice, paintingDataWithoutImage.image).subscribe(async (paymentIntentResponse: PAYMENT_INTENT_UPDATE)=> {
      if (paymentIntentResponse.status === 'requires_payment_method' && this.elements) {
        const {error} = await this.elements.fetchUpdates();
        if (error) {
          this.paymentServiceError(error);
        } else {
          this.createPaymentMethod(carrierRateSelected, paintingDataWithoutImage.price, paymentIntentResponse);
        }
      } else {
        this.paymentServiceError();
      }
    });
  }

  paymentServiceError(error?: any) {
    this.errorDialogService.open(PAYMENT_SERVICE_ERROR);
    this.router.navigate(['/checkout','payment']);
    this.loadingIndicatorService.hide();
    return throwError(() => error)
  }

  async createPaymentMethod(carrierRateSelected: CARRIER_RATE, paintingPrice: number, paymentIntentResponse: PAYMENT_INTENT_UPDATE) {
    const {error: submitError} = await this.elements.submit();
    if (submitError) {
      this.paymentServiceError(submitError);
      return;
    }
    const {error, paymentMethod} = await this.stripe?.createPaymentMethod({ elements: this.elements });
    
    if (error) {
      this.paymentServiceError(error);
      return;
    }
    
    this.navigateToConfirmationPage(carrierRateSelected, paintingPrice, paymentIntentResponse, paymentMethod as PAYMENT_METHOD_RESPONSE);
  }

  navigateToConfirmationPage(carrierRateSelected: CARRIER_RATE, paintingPrice: number, paymentIntentResponse: PAYMENT_INTENT_UPDATE, paymentMethodDetails: PAYMENT_METHOD_RESPONSE) {
    this.paymentConfirmationData = {
      carrierRateSelected: carrierRateSelected,
      paintingPrice: paintingPrice,
      totalAmount: paymentIntentResponse.amount,
      paymentMethodDetails: paymentMethodDetails,
    };
    this.router.navigate(['/checkout','confirmation']);
    this.loadingIndicatorService.hide();
  }

  submitPayment() {
    let router = this.router;
    if(this.stripe) {
      this.stripe.confirmPayment({
        clientSecret: this.paymentIntent.client_secret,
        redirect: "if_required",
        confirmParams: {
          payment_method: this.paymentConfirmationData.paymentMethodDetails.id,
          // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
          return_url: 'https://awakeningPainting.com',
          shipping: this.shippingService.getStripeFormattedShippingAddress()
        },
      })
      .then(function(result: any) {
        //HANDLE SUCCEDED OR OTHERWISE
        router.navigate(['/gallery']);
        if (result.error) {
          // Inform the customer that there was an error.
        }
      });
      }
  }

  getPaymentConfirmationData(): PAYMENT_CONFRIMATION_DATA {
    if(!this.paymentConfirmationData && !(this.confirmationService.getPaymentDataFromSessionStorage())) {
      this.router.navigate(['/checkout','payment']);
    } else if (this.confirmationService.getPaymentDataFromSessionStorage() && !this.paymentConfirmationData) {
      this.paymentConfirmationData = this.confirmationService.getPaymentDataFromSessionStorage();
    } else {
      this.confirmationService.setPaymentDataInSessionStorage(this.paymentConfirmationData);
    }
    return this.paymentConfirmationData;
  }

}
