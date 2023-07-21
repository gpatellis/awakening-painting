import { Component, OnInit } from '@angular/core';
import { PaintingData } from '../gallery/gallery-interfaces';
import { PaintingDetailsModalService } from '../gallery/painting-card/painting-details-modal/painting-details-modal.service';
import { Router } from '@angular/router';
import { PaintingImageService } from '../gallery/painting-image-service/painting-image.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ap-painting-checkout',
  templateUrl: './painting-checkout.component.html',
  styleUrls: ['./painting-checkout.component.scss']
})
export class PaintingCheckoutComponent implements OnInit {
  paintingDataWithoutImage: PaintingData = this.paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage();
  paintingDataWithImage$: Observable<PaintingData>;
  paintingImagePopulated: boolean;
  constructor(
    public paintingDetailsModalService: PaintingDetailsModalService,
    private router: Router,
    private paintingImageService: PaintingImageService) { }

  ngOnInit(): void {
    this.checkForPaintingData();
    this.paintingDataWithImage$ = this.paintingImageService.getSinglePaintingImage(this.paintingDataWithoutImage);
  }

  checkForPaintingData(): void {
    if(!this.paintingDataWithoutImage) {
      this.router.navigate(['/gallery']);
    }
  }
}
