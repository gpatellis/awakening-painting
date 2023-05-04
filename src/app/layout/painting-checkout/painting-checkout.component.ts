import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PaintingData } from '../gallery/gallery-interfaces';
import { PaintingDetailsModalService } from '../gallery/painting-card/painting-details-modal/painting-details-modal.service';

@Component({
  selector: 'ap-painting-checkout',
  templateUrl: './painting-checkout.component.html',
  styleUrls: ['./painting-checkout.component.scss']
})
export class PaintingCheckoutComponent implements OnInit {
  paintingData: PaintingData = this.paintingDetailsModalService.paintingChosenForPurchase;;
  
  constructor(
    public paintingDetailsModalService: PaintingDetailsModalService) { }

  ngOnInit(): void {
  }
}
