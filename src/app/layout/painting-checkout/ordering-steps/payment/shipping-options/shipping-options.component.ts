import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CARRIER_RATE } from '../../shipping/shipping.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ap-shipping-options',
  templateUrl: './shipping-options.component.html',
  styleUrls: ['./shipping-options.component.scss']
})
export class ShippingOptionsComponent {

  @Input() carrierRates: CARRIER_RATE[] | null;
  @Output() carrierOptionSelected =  new EventEmitter<CARRIER_RATE>();

  shippingOptionsFormGroup: FormGroup = new FormGroup({
    shippingOptionSelected: new FormControl('', Validators.required)
  })

  constructor() {}

  shippingOptionChange(rate: CARRIER_RATE): void {
    this.shippingOptionsFormGroup.get('shippingOptionSelected')?.setValue(rate.rate_id);
    this.carrierOptionSelected.emit(rate);
  }

  getShippingOptionSelected(): string {
    return this.shippingOptionsFormGroup.get('shippingOptionSelected')?.value;
  }
}
