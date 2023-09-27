import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PaintingData } from '../../gallery-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaintingDetailsModalService {

  public closePaintingDetailsModal$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  storePaintingSelectedForPurchaseToSessionStorage(painting: PaintingData) {
    sessionStorage.setItem('paintingDataChosenForPurchase', JSON.stringify(painting));
  }

  getPaintingSelectedForPurchaseFromSessionStorage() {
    let paintingDataString = sessionStorage.getItem('paintingDataChosenForPurchase');
    let paintingData: PaintingData = JSON.parse(paintingDataString as string);
    return paintingData;
  }

  deletePaintingSelectedForPurchaseFromSessionStorage() {
    sessionStorage.removeItem('paintingDataChosenForPurchase');
  }
}
