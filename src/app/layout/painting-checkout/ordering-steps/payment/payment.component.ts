import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../shipping/shipping.service';
import { Router } from '@angular/router';
import { CARRIER_RATE } from '../shipping/shipping.model';
import { Observable } from 'rxjs';
import {loadStripe} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { PaymentService } from './payment.service';
import { PaintingDetailsModalService } from 'src/app/layout/gallery/painting-card/painting-details-modal/painting-details-modal.service';
import { PaintingData } from 'src/app/layout/gallery/gallery-interfaces';



@Component({
  selector: 'ap-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  carrierRates$: Observable<CARRIER_RATE[]>;
  elements: any;
  paintingData: PaintingData = this.paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage();
  private clientSecret$: Observable<string>;

  constructor(
    private shippingService: ShippingService,
    private router: Router,
    private paymentService: PaymentService,
    private paintingDetailsModalService: PaintingDetailsModalService) {}

  ngOnInit(): void {
    this.loadStripe();
    if(!this.shippingService.getShippingAddressFromSessionStorage()) {
      this.router.navigate(['/checkout','shipping']);
      return;
    }
    this.getCarrierRates();
    this.getPaymentIntent()
  }

  getPaymentIntent() {
   this.clientSecret$ = this.paymentService.createPaymentIntent(this.paintingData.price, this.paintingData.image);
  }

  getCarrierRates() {
    this.carrierRates$ = this.shippingService.getCarrierRates();
  }

  async loadStripe() {
   let stripe = await loadStripe(environment.stripe.publicKey);
   this.elements = stripe?.elements();
   let card = this.elements.create('payment');
   card.mount('#card-element');
  }


}


