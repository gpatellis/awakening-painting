import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShippingService } from '../shipping/shipping.service';
import { Router } from '@angular/router';
import { CARRIER_RATE } from '../shipping/shipping.model';
import { Observable, Subscription } from 'rxjs';
import { PaymentService } from './payment.service';
import { StripeService } from '../../stripe/stripe.service';


@Component({
  selector: 'ap-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
  carrierRates$: Observable<CARRIER_RATE[]>;
  carrierRateSelected: CARRIER_RATE;
  isPaymentFormComplete: boolean = false;
  isPaymentFormCompletedSubscription$: Subscription;

  constructor(
    private shippingService: ShippingService,
    private router: Router,
    private paymentService: PaymentService,
    private stripeService: StripeService) {}

  ngOnInit(): void {
    if(!this.shippingService.getShippingAddressFromSessionStorage()) {
      this.router.navigate(['/checkout','shipping']);
      return;
    }
    this.getCarrierRates();
    this.checkForPaymentFormCompletion();
  }

  getCarrierRates(): void {
    this.carrierRates$ = this.shippingService.getCarrierRates();
  }

  listenForCarrierRateSelected(carrierOption: CARRIER_RATE): void {
    this.carrierRateSelected = carrierOption;
    this.paymentService.carrierRateSelected$.next(carrierOption);
  }

  checkForPaymentFormCompletion(): void {
    this.isPaymentFormCompletedSubscription$ = this.paymentService.isPaymentFormCompleted().subscribe((isComplete: boolean) => {
        this.isPaymentFormComplete = isComplete;
    });
  }

  processPaymentData(): void {
    this.stripeService.proccessPaymentData(this.carrierRateSelected);
  }

  ngOnDestroy(): void {
    this.isPaymentFormCompletedSubscription$.unsubscribe();
  }

}


