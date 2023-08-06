import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../shipping/shipping.service';
import { Router } from '@angular/router';
import { CARRIER_RATE } from '../shipping/shipping.model';
import { Observable } from 'rxjs';



@Component({
  selector: 'ap-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  carrierRates$: Observable<CARRIER_RATE[]>;

  constructor(
    private shippingService: ShippingService,
    private router: Router) {}

  ngOnInit(): void {
    if(!this.shippingService.getShippingAddressFromSessionStorage()) {
      this.router.navigate(['/checkout','shipping']);
      return;
    }
    this.getCarrierRates();
  }

  getCarrierRates() {
    this.carrierRates$ = this.shippingService.getCarrierRates();
  }

}


