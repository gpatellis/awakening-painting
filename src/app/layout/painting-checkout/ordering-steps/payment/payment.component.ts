import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../shipping/shipping.service';

@Component({
  selector: 'ap-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{

  constructor(private shippingService: ShippingService) {}

  ngOnInit(): void {
    this.shippingService.getCarrierRates().subscribe((response) => {
      console.log(response);
    });
  }
}
