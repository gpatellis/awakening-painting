import {  ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GOOGLE_ADDRESS_RESPONSE } from '../../painting-checkout.model';
import { ShippingService } from './shipping.service';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';


@Component({
  selector: 'ap-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shippingForm: FormGroup = this.shippingService.getShippingFormGroup();

  constructor(
    private cd: ChangeDetectorRef, 
    private shippingService: ShippingService,
    private loadingIndicatorService: LoadingIndicatorService) {
  }

  ngOnInit() {
  }

  populateAddressInfo(addressResponse: GOOGLE_ADDRESS_RESPONSE) {
    let addressComponents = addressResponse.address_components;
    this.shippingForm.setValue({
      address: `${addressComponents[0].long_name} ${addressComponents[1].long_name}`,
      aptSuite: '',
      city: `${addressComponents[2].long_name}`,
      state: `${addressComponents[4].long_name}`,
      zip: `${addressComponents[6].long_name}`,
      country: `${addressComponents[5].long_name}`,
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
    this.loadingIndicatorService.show();
  }

}
