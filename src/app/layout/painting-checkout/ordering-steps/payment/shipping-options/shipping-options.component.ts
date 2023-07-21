import { Component, Input } from '@angular/core';
import { CARRIER_RATE } from '../../shipping/shipping.model';

@Component({
  selector: 'ap-shipping-options',
  templateUrl: './shipping-options.component.html',
  styleUrls: ['./shipping-options.component.scss']
})
export class ShippingOptionsComponent {

  @Input() carrierRates: CARRIER_RATE[] | null;

}
