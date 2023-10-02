import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShippingService } from '../shipping/shipping.service';

@Component({
  selector: 'ap-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.scss']
})
export class OrderCompleteComponent {
  emailAddress: string | undefined = this.shippingService.matchedAddress ? this.shippingService.matchedAddress.emailAddress : this.shippingService.getShippingAddressFromSessionStorage()?.emailAddress;

  constructor(private router: Router,
    private shippingService: ShippingService) {}

  routeBackToGallery() {
    this.router.navigate(['/gallery']);
  }

}
