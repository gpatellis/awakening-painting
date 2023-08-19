import { Component, Input, OnInit } from '@angular/core';
import { ORDERING_STATUS } from '../painting-checkout.model';
import { OrderingStatusService } from './ordering-status.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-ordering-status',
  templateUrl: './ordering-status.component.html',
  styleUrls: ['./ordering-status.component.scss']
})
export class OrderingStatusComponent implements OnInit{

  orderingStatus: Observable<ORDERING_STATUS> = this.orderingStatusService.OrderingStatus$;
  ORDERING_STATUS = ORDERING_STATUS;

  constructor(
    private orderingStatusService: OrderingStatusService,
    private router: Router) { }

  ngOnInit(): void {
    this.listenForRouteChange()
  }

  listenForRouteChange() {
    this.router.events.subscribe(() => {
      switch(this.router.url) { 
        case '/checkout/shipping': { 
          this.orderingStatusService.OrderingStatus$.next(ORDERING_STATUS.shipping)
          break; 
        } 
        case '/checkout/payment': { 
          this.orderingStatusService.OrderingStatus$.next(ORDERING_STATUS.payment)
           break; 
        } 
        case '/checkout/confirmation': { 
          this.orderingStatusService.OrderingStatus$.next(ORDERING_STATUS.confirmation)
           break; 
        } 
        default: { 
          this.orderingStatusService.OrderingStatus$.next(ORDERING_STATUS.shipping)
          break; 
        } 
     } 
  });

  }
}
