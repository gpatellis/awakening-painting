import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { StripePaymentElement, StripeShippingAddressElement } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { StripeService } from '../../../stripe/stripe.service';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'ap-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.scss']
})
export class CardInputComponent implements OnInit, OnDestroy{
  cardInputElement: StripePaymentElement;
  billingAddressElement: StripeShippingAddressElement;
  stripeElementsSubscription$: Subscription;

  constructor(
    private paymentService: PaymentService,
    private stripeService: StripeService,
    private loadingIndicatorService: LoadingIndicatorService) {
  }

  ngOnInit(): void {
    this.loadStripeCardAndBillingAddressElements();
  }

  loadStripeCardAndBillingAddressElements(): void {
    this.stripeElementsSubscription$ = this.stripeService.stripeElements$.subscribe((elements: any) => {
      if(elements) {
        let billingOptions = { 
          mode: 'billing',
          autocomplete: {
            mode: 'google_maps_api',
            apiKey: environment.googleMapsApi.apiKey
          }
        };
  
        this.cardInputElement = elements.create('payment');
        this.billingAddressElement = elements.create('address', billingOptions);
    
        this.cardInputElement.mount('#card-element');
        this.billingAddressElement.mount('#billing-address-element');
    
        this.listenForAddressElementComplete();
        this.listenForCardInputElementComplete();
        
        this.loadingIndicatorService.hide();
      }
    });
  }

  listenForAddressElementComplete(): void {
    this.billingAddressElement.on('change', (event) => {
        this.paymentService.isAddressElementComplete$.next(event.complete);
    });
  }

  listenForCardInputElementComplete(): void {
    this.cardInputElement.on('change', (event) => {
      this.paymentService.isCardInputElementComplete$.next(event.complete);
    });
  }

  ngOnDestroy(): void {
    if(this.billingAddressElement && this.cardInputElement) {
      this.billingAddressElement.destroy();
      this.cardInputElement.destroy();
    }
    this.stripeElementsSubscription$.unsubscribe();
  }
}
