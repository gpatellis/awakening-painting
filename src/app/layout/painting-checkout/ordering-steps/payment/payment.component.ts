import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../shipping/shipping.service';
import { Router } from '@angular/router';
import { CARRIER_RATE } from '../shipping/shipping.model';
import { Observable } from 'rxjs';
import { PaymentService } from './payment.service';
import { StripeService } from '../../stripe/stripe.service';
import { PaintingData } from 'src/app/layout/gallery/gallery-interfaces';
import { PaintingDetailsModalService } from 'src/app/layout/gallery/painting-card/painting-details-modal/painting-details-modal.service';



@Component({
  selector: 'ap-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  carrierRates$: Observable<CARRIER_RATE[]>;
  carrierOptionSelected: CARRIER_RATE;
  isPaymentFormComplete: boolean = false;
  paintingDataWithoutImage: PaintingData = this.paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage();

  constructor(
    private shippingService: ShippingService,
    private router: Router,
    private paymentService: PaymentService,
    private stripeService: StripeService,
    private paintingDetailsModalService: PaintingDetailsModalService) {}

  ngOnInit(): void {
    if(!this.shippingService.getShippingAddressFromSessionStorage()) {
      this.router.navigate(['/checkout','shipping']);
      return;
    }
    this.getCarrierRates();
    this.checkForPaymentFormCompletion();
  }

  getCarrierRates() {
    this.carrierRates$ = this.shippingService.getCarrierRates();
  }

  listenForCarrierOptionSelected(carrierOption: CARRIER_RATE) {
    this.carrierOptionSelected = carrierOption;
    this.paymentService.carrierOptionSelected$.next(carrierOption);
  }

  checkForPaymentFormCompletion() {
    this.paymentService.isPaymentFormCompleted().subscribe(([isCardInputElementComplete, isAddressElementComplete, carrierRateSelected]) => {
        this.isPaymentFormComplete = isCardInputElementComplete && isAddressElementComplete && (carrierRateSelected !== undefined);
    });
  }

  processPaymentData() {
    let updatedStripePrice = (this.carrierOptionSelected.shipping_amount.amount + this.paintingDataWithoutImage.price) * 100;
    this.stripeService.updatePaymentIntent(updatedStripePrice, this.paintingDataWithoutImage.image).subscribe((value)=> {
          console.log(value);
    });
  }

}


