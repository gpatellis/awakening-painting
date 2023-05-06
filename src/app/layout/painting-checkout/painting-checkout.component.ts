import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PaintingData } from '../gallery/gallery-interfaces';
import { PaintingDetailsModalService } from '../gallery/painting-card/painting-details-modal/painting-details-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-painting-checkout',
  templateUrl: './painting-checkout.component.html',
  styleUrls: ['./painting-checkout.component.scss']
})
export class PaintingCheckoutComponent implements OnInit {
  paintingData: PaintingData = this.paintingDetailsModalService.paintingChosenForPurchase;;
  
  constructor(
    public paintingDetailsModalService: PaintingDetailsModalService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkForPaintingData();
  }

  checkForPaintingData() {
    if(!this.paintingData) {
      this.router.navigate(['/gallery']);
    }
  }
}
