import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaintingData } from '../gallery/gallery-interfaces';
import { PaintingDetailsModalService } from '../gallery/painting-card/painting-details-modal/painting-details-modal.service';
import { Router } from '@angular/router';
import { PaintingImageService } from '../gallery/painting-image-service/painting-image.service';
import { Observable } from 'rxjs';
import { StripeService } from './stripe/stripe.service';
import { ShippingService } from './ordering-steps/shipping/shipping.service';

@Component({
  selector: 'ap-painting-checkout',
  templateUrl: './painting-checkout.component.html',
  styleUrls: ['./painting-checkout.component.scss']
})
export class PaintingCheckoutComponent implements OnInit, OnDestroy {
  
  paintingDataWithoutImage: PaintingData = this.paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage();
  paintingDataWithImage$: Observable<PaintingData>;
  paintingImagePopulated: boolean;

  constructor(
    public paintingDetailsModalService: PaintingDetailsModalService,
    private router: Router,
    private paintingImageService: PaintingImageService,
    private stripeService: StripeService,
    private shippingService: ShippingService) { }

  ngOnInit(): void {
    this.checkForPaintingData();
    this.isStripeElementsCreated();
    this.paintingDataWithImage$ = this.paintingImageService.getSinglePaintingImage(this.paintingDataWithoutImage);
  }

  isStripeElementsCreated(): void {
      this.stripeService.getStripeElements(this.paintingDataWithoutImage.price, this.paintingDataWithoutImage.image);
  }

  checkForPaintingData(): void {
    if(!this.paintingDataWithoutImage) {
      this.router.navigate(['/gallery']);
    }
  }

  ngOnDestroy(): void {
    this.stripeService.stripeElements$.next(undefined);
    this.shippingService.deleteShippingAddressFromSessionStorage();
  }
}
