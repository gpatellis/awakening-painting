import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShippingService } from '../shipping/shipping.service';
import { PaintingDetailsModalService } from 'src/app/layout/gallery/painting-card/painting-details-modal/painting-details-modal.service';
import { ConfirmationService } from '../confirmation/confirmation.service';

@Component({
  selector: 'ap-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.scss']
})
export class OrderCompleteComponent implements OnInit, OnDestroy{
  emailAddress: string | undefined = this.shippingService.matchedAddress ? this.shippingService.matchedAddress.emailAddress : this.shippingService.getShippingAddressFromSessionStorage()?.emailAddress;

  constructor(private router: Router,
    private shippingService: ShippingService,
    private paintingDetailsModalService: PaintingDetailsModalService,
    private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.paintingDetailsModalService.deletePaintingSelectedForPurchaseFromSessionStorage();
  }

  routeBackToGallery() {
    this.router.navigate(['/gallery']);
  }

  ngOnDestroy(): void {
    this.confirmationService.orderComplete = false;
  }

}
