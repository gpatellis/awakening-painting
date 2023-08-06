import { Component, OnInit } from '@angular/core';
import { PaintingData } from 'src/app/layout/gallery/gallery-interfaces';
import { PaintingDetailsModalService } from 'src/app/layout/gallery/painting-card/painting-details-modal/painting-details-modal.service';
import { PaymentService } from '../payment.service';
import {loadStripe} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'ap-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.scss']
})
export class CardInputComponent implements OnInit{
  paintingData: PaintingData = this.paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage();
  elements: any;

  constructor(private paintingDetailsModalService: PaintingDetailsModalService,
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
      clientSecret: clientSecret,
      appearance: {/*...*/},
    };
    const billingOptions = { mode: 'billing' }
    let stripe = await loadStripe(environment.stripe.publicKey);
    this.elements = stripe?.elements(paymentOptions);

    let cardElement = this.elements.create('payment');
    let addressElement = this.elements.create('address', billingOptions);

    cardElement.mount('#card-element');
    addressElement.mount('#address-element');
  }

}
