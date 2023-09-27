import { Injectable } from '@angular/core';
import { PaintingData } from '../gallery/gallery-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaintingCheckoutService {
  paintingChosenForPurchaseWithoutImage: PaintingData;

  constructor() { }

  setPaintingDataForCheckout(paintingDataWithoutImage: PaintingData) {
    this.paintingChosenForPurchaseWithoutImage = paintingDataWithoutImage;
  }
}
