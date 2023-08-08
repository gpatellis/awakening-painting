import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { PaintingData } from 'src/app/layout/gallery/gallery-interfaces';
import { PaintingDetailsModalService } from 'src/app/layout/gallery/painting-card/painting-details-modal/painting-details-modal.service';
import { PaymentService } from '../payment.service';
import {StripeElements, StripePaymentElement, StripeShippingAddressElement, loadStripe} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';


@Component({
  selector: 'ap-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.scss']
})
export class CardInputComponent implements OnInit{
  paintingData: PaintingData = this.paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage();
  elements: any;
  isBillingAddressSameAsShipping: boolean;
  cardInputElement: StripePaymentElement;
  addressElement: StripeShippingAddressElement;

  constructor(
    private paintingDetailsModalService: PaintingDetailsModalService,
    private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.getPaymentIntent();
  }

  getPaymentIntent() {
    this.paymentService.createPaymentIntent(this.paintingData.price, this.paintingData.image).subscribe((clientSecret) => {
     this.loadStripe(clientSecret);
    });
   }

   async loadStripe(clientSecret: string) {
    const paymentOptions = {
      clientSecret: clientSecret
    };
    let billingOptions = { 
      mode: 'billing',
      autocomplete: {
        mode: 'google_maps_api',
        apiKey: 'AIzaSyC9s0coG4ziTZ9etSHtm_FWwrPRPX9c2eE' 
      },
      disabled: true
    }
    
    let stripe = await loadStripe(environment.stripe.publicKey);
    this.elements = stripe?.elements(paymentOptions);

    this.cardInputElement = this.elements.create('payment');
    this.addressElement = this.elements.create('address', billingOptions);

    this.cardInputElement.mount('#card-element');
    this.addressElement.mount('#address-element');
  }

  listenForBillingAddressSlideToggle(event: MatSlideToggleChange) {
    if(event.checked) {
      this.isBillingAddressSameAsShipping = true;
    } else {
      this.isBillingAddressSameAsShipping = false;
    }
  }

}
