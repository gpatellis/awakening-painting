import { Component, Input, OnInit } from '@angular/core';
import { ORDERING_STATUS } from '../painting-checkout.model';
import { OrderingStatusService } from './ordering-status.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ap-ordering-status',
  templateUrl: './ordering-status.component.html',
  styleUrls: ['./ordering-status.component.scss']
})
export class OrderingStatusComponent {

  orderingStatus: Observable<ORDERING_STATUS> = this.orderingStatusService.OrderingStatus$;
  ORDERING_STATUS = ORDERING_STATUS;

  constructor(private orderingStatusService: OrderingStatusService) { }
}
