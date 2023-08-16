import {  ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GOOGLE_ADDRESS_RESPONSE } from '../../painting-checkout.model';
import { ShippingService } from './shipping.service';


@Component({
  selector: 'ap-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shippingForm: FormGroup = this.shippingService.getShippingFormGroup();
  addressLine1Selected: boolean;

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
      address_line2: this.shippingForm.get('address_line2')?.value,
      city: `${addressComponents.find((addressComponent) => addressComponent.types[0] == 'locality')?.long_name}`,
      state: `${addressComponents.find((addressComponent) => addressComponent.types[0] == 'administrative_area_level_1')?.long_name}`,
      zip: `${addressComponents.find((addressComponent) => addressComponent.types[0] == 'postal_code')?.long_name}`,
      country: `US`,
      fullName: this.shippingForm.get('fullName')?.value,
      emailAddress: this.shippingForm.get('emailAddress')?.value
    });
    this.addressLine1Selected = true;
    this.cd.detectChanges();
  }

  getErrorMessage(formControlName: string, label: string) {
    if (this.shippingForm.get(formControlName) && (this.shippingForm.get(formControlName)?.hasError)) {
      return `You must enter ${label}`;
    } else 
      return;
  }

  isFormControlError(formControlName: string ) {
    return this.shippingForm.get(formControlName)?.invalid && this.shippingForm.get(formControlName)?.touched;
  }

  submitShippingForm() {
    this.shippingService.validateAddress(this.shippingForm);
  }

}
