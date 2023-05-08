import { Component, Input, OnInit } from '@angular/core';
import { ORDERING_STATUS } from '../painting-checkout.model';

@Component({
  selector: 'ap-ordering-status',
  templateUrl: './ordering-status.component.html',
  styleUrls: ['./ordering-status.component.scss']
})
export class OrderingStatusComponent {

  @Input() orderingStatus: ORDERING_STATUS = ORDERING_STATUS.shipping;
  ORDERING_STATUS = ORDERING_STATUS;

  constructor() { }

}
