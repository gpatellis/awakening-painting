import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaintingDetailsModalService {

  public closePaintingDetailsModal = new BehaviorSubject<boolean>(false);

  constructor() { }
}
