import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../stripe/stripe.service';
import { Router } from '@angular/router';
import { ShippingService } from '../shipping/shipping.service';

@Component({
  selector: 'ap-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  
  paymentConfirmationData = this.stripeSerivce.paymentConfirmationData;
  shippingData =  this.shippingService.matchedAddress;

  constructor(private stripeSerivce: StripeService,
    private router: Router,
    public shippingService: ShippingService){}

  ngOnInit(): void {
    this.checkForPaymentConfirmationData();
  }

  checkForPaymentConfirmationData() {
    if(!this.paymentConfirmationData) {
      this.router.navigate(['/checkout','payment']);
    }
  }

}
