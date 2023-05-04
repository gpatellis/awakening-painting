import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaintingData } from '../../gallery-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaintingDetailsModalService {

  public closePaintingDetailsModal$ = new BehaviorSubject<boolean>(false);
  public paintingChosenForPurchase: PaintingData;

  constructor() { }
}
