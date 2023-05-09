import {  Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


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
    phone: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailAddress: new FormControl('')
  });
  constructor() {
  }

  ngOnInit() {
  }

}
