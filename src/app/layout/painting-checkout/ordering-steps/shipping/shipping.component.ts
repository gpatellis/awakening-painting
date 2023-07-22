import {  ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GOOGLE_ADDRESS_RESPONSE } from '../../painting-checkout.model';
import { ShippingService } from './shipping.service';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ap-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shippingForm: FormGroup = this.shippingService.getShippingFormGroup();

  constructor(
    private cd: ChangeDetectorRef, 
    private shippingService: ShippingService) {
  }

  ngOnInit() {
  }

  populateAddressInfo(addressResponse: GOOGLE_ADDRESS_RESPONSE) {
    let addressComponents = addressResponse.address_components;
    this.shippingForm.setValue({
      address: `${addressComponents.find((addressComponent) => addressComponent.types[0] == 'street_number')?.long_name} ${addressComponents.find((addressComponent) => addressComponent.types[0] == 'route')?.long_name}`,
      address_line2: '',
      city: `${addressComponents.find((addressComponent) => addressComponent.types[0] == 'locality')?.long_name}`,
      state: `${addressComponents.find((addressComponent) => addressComponent.types[0] == 'administrative_area_level_1')?.long_name}`,
      zip: `${addressComponents.find((addressComponent) => addressComponent.types[0] == 'postal_code')?.long_name}`,
      country: `US`,
      phone: '',
      firstName: '',
      lastName: '',
      emailAddress: ''
    });
    this.cd.detectChanges();
  }

  getErrorMessage(formControlName: string, label: string) {
    if (this.shippingForm.get(formControlName) && (this.shippingForm.get(formControlName)?.hasError)) {
      return `You must enter ${label}`;
    } else 
      return;
  }

  submitShippingForm() {
    this.shippingService.validateAddress(this.shippingForm);
  }

}
