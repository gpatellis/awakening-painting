import { Component, OnInit } from '@angular/core';
import { PaintingData } from 'src/app/layout/gallery/gallery-interfaces';
import { PaintingDetailsModalService } from 'src/app/layout/gallery/painting-card/painting-details-modal/painting-details-modal.service';
import { PaymentService } from '../payment.service';
import { StripePaymentElement, StripeShippingAddressElement, loadStripe} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'ap-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.scss']
})
export class CardInputComponent implements OnInit{
  paintingData: PaintingData = this.paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage();
  elements: any;
  isBillingAddressSameAsShipping: boolean = false;
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
        apiKey: 'AIzaSyC9s0coG4ziTZ9etSHtm_FWwrPRPX9c2eE' //extract to env
      }
    }
    
    let stripe = await loadStripe(environment.stripe.publicKey);
    this.elements = stripe?.elements(paymentOptions);

    this.cardInputElement = this.elements.create('payment');
    this.addressElement = this.elements.create('address', billingOptions);

    this.cardInputElement.mount('#card-element');
    this.addressElement.mount('#address-element');

    this.listenForAddressElementComplete();
    this.listenForCardInputElementComplete();
  }

  listenForBillingAddressSlideToggle() {
    this.isBillingAddressSameAsShipping = !this.isBillingAddressSameAsShipping;
    this.paymentService.isAddressElementComplete$.next(this.isBillingAddressSameAsShipping);
  }

  listenForAddressElementComplete() {
    this.addressElement.on('change', (event) => {
      this.paymentService.isAddressElementComplete$.next(event.complete);
    });
  }

  listenForCardInputElementComplete() {
    this.cardInputElement.on('change', (event) => {
      this.paymentService.isCardInputElementComplete$.next(event.complete);
    });
  }

}
