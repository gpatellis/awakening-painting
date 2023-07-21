import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaintingData } from '../../gallery-interfaces';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PaintingDetailsModalService {

  public closePaintingDetailsModal$ = new BehaviorSubject<boolean>(false);

  constructor(private sanitizer: DomSanitizer) { }

  storePaintingSelectedForPurchaseToSessionStorage(painting: PaintingData) {
    sessionStorage.setItem('paintingData', JSON.stringify(painting));
  }

  getPaintingSelectedForPurchaseFromSessionStorage() {
    let paintingDataString = sessionStorage.getItem('paintingData');
    let paintingData: PaintingData = JSON.parse(paintingDataString as string);
    return paintingData;
  }
}
