import {  Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GOOGLE_ADDRESS_RESPONSE } from '../../painting-checkout.model';


@Component({
  selector: 'ap-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shippingForm = new FormGroup({
    address: new FormControl(''),
    aptSuite: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
    country: new FormControl(''),
    phone: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailAddress: new FormControl('')
  }); //consider adding enumerator in html ngfor
  constructor() {
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
  }

}
