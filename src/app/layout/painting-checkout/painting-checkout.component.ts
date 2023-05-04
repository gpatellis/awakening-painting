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
  paintingData: PaintingData | undefined;
  
  constructor(
    public paintingDetailsModalService: PaintingDetailsModalService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.paintingDetailsModalService.paintingChosenForPurchase.subscribe((paintingData: PaintingData) => {
      this.paintingData = paintingData;
      console.log(this.paintingData);
    });
  }

}
