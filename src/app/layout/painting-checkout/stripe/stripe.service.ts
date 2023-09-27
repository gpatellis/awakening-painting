import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StripeElements, loadStripe } from '@stripe/stripe-js';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PAYMENT_CONFRIMATION_DATA, PAYMENT_INTENT, PAYMENT_INTENT_UPDATE, PAYMENT_METHOD, STRIPE_CONFIRMATION_RESPONSE } from '../ordering-steps/payment/payment.model';
import { ErrorDialogService } from 'src/app/shared-services/error-dialog/error-dialog.service';
import { Router } from '@angular/router';
import { CHECKOUT_ERROR, CREDIT_CARD_ERROR, PAYMENT_SERVICE_ERROR } from 'src/app/api-error-messages.constants';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';
import { CARRIER_RATE } from '../ordering-steps/shipping/shipping.model';
import { ShippingService } from '../ordering-steps/shipping/shipping.service';
import { PaintingCheckoutService } from '../painting-checkout.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  elements: StripeElements;
  stripeElements$ = new BehaviorSubject<StripeElements | undefined>(undefined);
  paymentIntent: PAYMENT_INTENT;
  paymentConfirmationData: PAYMENT_CONFRIMATION_DATA;
  stripe: any;

  constructor(private httpClient: HttpClient,
    private errorDialogService: ErrorDialogService,
    private router: Router,
    private loadingIndicatorService: LoadingIndicatorService,
    private shippingService: ShippingService,
    private paintingCheckoutService: PaintingCheckoutService) { }

  createPaymentIntent(paintingImageName: string): Observable<string | undefined> {
    let requestBody = {
        "paintingImage": paintingImageName
    }
    
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    if(this.getPaymentIntentFromSessionStorage()) {
      this.paymentIntent = this.getPaymentIntentFromSessionStorage();
      return of(this.paymentIntent?.client_secret);
    }
    return this.httpClient.post(
      environment.createPaymentIntentEndpoint, requestBody, {'headers':headers}).pipe(
        map((response) => {
            this.paymentIntent = response as PAYMENT_INTENT;;
            this.storePaymentIntentInSessionStorage();
            return this.paymentIntent.client_secret;
        }),
        catchError( error => {
          return this.checkoutError(error);
        })
    )
  };

  checkoutError(error: any) {
    this.errorDialogService.open(CHECKOUT_ERROR);
    this.router.navigate(['/gallery']);
    return throwError(() => error)
  }

  async getStripeElements(paintingImageName: string): Promise<void> {
      this.createPaymentIntent(paintingImageName).subscribe(async (client_secret) => {
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
  
        let stripe = await this.loadStripe();
  
        let elements = stripe?.elements(paymentOptions);
        if (elements)
          this.elements = elements;
        else
          this.paymentServiceError(PAYMENT_SERVICE_ERROR, 'stripe.elements() did not return elements');
  
        this.stripeElements$.next(this.elements);
        this.loadingIndicatorService.hide();
      })
  }

  async loadStripe() {
    let stripe = await loadStripe(environment.stripe.publicKey);
    if(stripe) {
      this.stripe = stripe;
      return this.stripe;
    }
    else
      this.paymentServiceError(PAYMENT_SERVICE_ERROR, 'loadStripe() did not return stripe');
  }

  updatePaymentIntent(shippingAmount: number, paintingImageName: string): Observable<PAYMENT_INTENT_UPDATE | undefined> {
    let requestBody = {
      "paintingImage": paintingImageName,
      "shippingAmount": shippingAmount,
      "paymentIntentId": this.paymentIntent?.paymentIntentId
  }
  
  let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(
      environment.updatePaymentIntentEndpoint, requestBody, {'headers':headers}).pipe(
        map((response) => {
          let updatePaymentIntentReponse = response as PAYMENT_INTENT_UPDATE;
          return updatePaymentIntentReponse;
        }),
        catchError( error => {
          this.errorDialogService.open(PAYMENT_SERVICE_ERROR);
          this.router.navigate(['/checkout','payment']);
          this.loadingIndicatorService.hide();
          return throwError(() => error)
        })
    )
  }

  async proccessPaymentData(carrierRateSelected: CARRIER_RATE): Promise<void> {
    this.loadingIndicatorService.show();
    this.updatePaymentIntent(carrierRateSelected.shipping_amount.amount, this.paintingCheckoutService.paintingChosenForPurchaseWithoutImage.image).subscribe(async (paymentIntentResponse: PAYMENT_INTENT_UPDATE | undefined)=> {
      if (paymentIntentResponse?.status === 'requires_payment_method' && this.elements) {
        const {error} = await this.elements.fetchUpdates();
        if (error) {
          this.paymentServiceError(PAYMENT_SERVICE_ERROR, error);
        } else {
          this.createPaymentMethod(carrierRateSelected, this.paymentIntent.amount, paymentIntentResponse);
        }
      } else {
        this.paymentServiceError(PAYMENT_SERVICE_ERROR);
      }
    });
  }

  paymentServiceError(message: string, error?: any) {
    this.errorDialogService.open(message, error);
    this.router.navigate(['/checkout','payment']);
    this.loadingIndicatorService.hide();
  }

  async createPaymentMethod(carrierRateSelected: CARRIER_RATE, paintingPrice: number, paymentIntentResponse: PAYMENT_INTENT_UPDATE) {
    const {error: submitError} = await this.elements.submit();
    if (submitError) {
      this.paymentServiceError(PAYMENT_SERVICE_ERROR, submitError);
      return;
    }
    const {error, paymentMethod} = await this.stripe?.createPaymentMethod({ elements: this.elements });
    if (error && error.type == 'card_error') {
      this.paymentServiceError(CREDIT_CARD_ERROR, error);
      return;
    } else if (error) {
      this.paymentServiceError(PAYMENT_SERVICE_ERROR);
    }
    
    this.navigateToConfirmationPage(carrierRateSelected, paintingPrice, paymentIntentResponse, paymentMethod as PAYMENT_METHOD);
  }

  navigateToConfirmationPage(carrierRateSelected: CARRIER_RATE, paintingPrice: number, paymentIntentResponse: PAYMENT_INTENT_UPDATE, paymentMethodDetails: PAYMENT_METHOD) {
    this.paymentConfirmationData = {
      carrierRateSelected: carrierRateSelected,
      paintingPrice: paintingPrice,
      totalAmount: paymentIntentResponse.amount,
      paymentMethodDetails: paymentMethodDetails,
      paymentIntent: this.paymentIntent
    };
    this.setPaymentDataInSessionStorage(this.paymentConfirmationData);
    this.router.navigate(['/checkout','confirmation']);
    this.loadingIndicatorService.hide();
  }

  submitPayment(client_secret: string | undefined, paymentMethodId: string) {
    return this.stripe.confirmPayment({
      clientSecret: client_secret,
      redirect: "if_required",
      confirmParams: {
        payment_method: paymentMethodId,
        return_url: 'https://awakeningPainting.com',
        shipping: this.shippingService.getStripeFormattedShippingAddress()
      },
    })
  }

  storePaymentIntentInSessionStorage() {
    sessionStorage.setItem('paymentIntent', JSON.stringify(this.paymentIntent));
  }

  getPaymentIntentFromSessionStorage(): PAYMENT_INTENT {
    let paymentIntentString = sessionStorage.getItem('paymentIntent');
    let paymentIntent = JSON.parse(paymentIntentString as string);
    return paymentIntent as PAYMENT_INTENT;
  }

  deletePaymentIntentFromSessionStorage() {
    sessionStorage.removeItem('paymentIntent');
  }

  getPaymentDataFromSessionStorage(): PAYMENT_CONFRIMATION_DATA {
    let paymentConfirmationDataString = sessionStorage.getItem('paymentConfirmationData');
    let paymentConfirmationData = JSON.parse(paymentConfirmationDataString as string);
    return paymentConfirmationData;
  }

  setPaymentDataInSessionStorage(paymentConfirmationData: PAYMENT_CONFRIMATION_DATA): void {
    sessionStorage.setItem('paymentConfirmationData', JSON.stringify(paymentConfirmationData));
  }

  deletePaymentDataFromSessionStorage(): void {
    sessionStorage.removeItem('paymentConfirmationData');
  }
}
