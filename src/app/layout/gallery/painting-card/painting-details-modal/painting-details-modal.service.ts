import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PaintingModalData } from '../../gallery-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaintingDetailsModalService {

  public closePaintingDetailsModal = new BehaviorSubject<boolean>(false);
  public paintingChosenForPurchase = new Subject<PaintingModalData>();

  constructor() { }
}
