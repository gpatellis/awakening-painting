import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../stripe/stripe.service';
import { Router } from '@angular/router';
import { ShippingService } from '../shipping/shipping.service';
import { ConfirmationService } from './confirmation.service';
import { ADDRESS } from '../shipping/shipping.model';

@Component({
  selector: 'ap-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  
  paymentConfirmationData = this.stripeSerivce.paymentConfirmationData;
  shippingData: ADDRESS | undefined = this.shippingService.matchedAddress ? this.shippingService.matchedAddress : this.shippingService.getShippingAddressFromSessionStorage();

  constructor(private stripeSerivce: StripeService,
    private router: Router,
    public shippingService: ShippingService,
    private confirmationService: ConfirmationService){}

  ngOnInit(): void {
    this.checkForPaymentData();
  }

  checkForPaymentData() {
    if(!this.paymentConfirmationData && !(this.confirmationService.getPaymentDataFromSessionStorage())) {
      this.router.navigate(['/checkout','payment']);
    } else if (this.confirmationService.getPaymentDataFromSessionStorage() && !this.paymentConfirmationData) {
      this.paymentConfirmationData = this.confirmationService.getPaymentDataFromSessionStorage();
    } else {
      this.confirmationService.setPaymentDataInSessionStorage(this.paymentConfirmationData);
    }
  }

  processOrderData() {
    
  }

}
