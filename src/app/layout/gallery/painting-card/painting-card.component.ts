import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PaintingData } from '../gallery-interfaces';
import { PaintingDetailsModalComponent } from './painting-details-modal/painting-details-modal.component';
import { PaintingDetailsModalService } from './painting-details-modal/painting-details-modal.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ap-painting-card',
  templateUrl: './painting-card.component.html',
  styleUrls: ['./painting-card.component.scss']
})
export class PaintingCardComponent implements OnInit, OnDestroy {

  @Input()
  painting!: PaintingData;
  @Input() isMobileView: boolean | null = false;
  @Input()isTabletView: boolean | null = false;
  paintingDetailsDialogRef!: MatDialogRef<PaintingDetailsModalComponent>;
  closePaintingDetailsModalSubscrption: Subscription;
  showPaintingPrice = environment.allowOnlineCheckout;

  constructor(
    public dialog: MatDialog,
    private paintingDetailsModalService: PaintingDetailsModalService) { }

  ngOnInit(): void {
    this.listenForPaintingDetailsModalClose();
  }

  getImageHeight(painting: PaintingData): string | void {
    if(this.isMobileView)
      return;
    else if (painting.aspectRatio > 2) 
      return '150px';
    else if ((painting.aspectRatio) < 2 && (painting.aspectRatio > 1.49))
      return '215px';
     else
      return '230px';
    } 
    
    getImageWidth() {
      if(this.isMobileView) {
        return '85%';
      }
      return;
    }

    checkToOpenModal(fromViewDetailsButton: boolean): void {
      if(this.painting.renderedImage && !(this.isMobileView || this.isTabletView) && !fromViewDetailsButton) {
        this.openPaintingDetailsModal();
      } else if(this.painting.renderedImage && fromViewDetailsButton) {
        this.openPaintingDetailsModal();
      }
    }

    openPaintingDetailsModal(): void {
      this.paintingDetailsDialogRef = this.dialog.open(PaintingDetailsModalComponent, {
        data: { 
          painting: this.painting,
          isMobileView: this.isMobileView,
          isTabletView: this.isTabletView
        },
        panelClass: 'painting-details-modal'
      });
    }

    listenForPaintingDetailsModalClose(): void {
      this.closePaintingDetailsModalSubscrption = this.paintingDetailsModalService.closePaintingDetailsModal$.subscribe((closeModal) => {
        if (closeModal && this.paintingDetailsDialogRef)
          this.paintingDetailsDialogRef.close();
      });
    }

    ngOnDestroy(): void {
      this.closePaintingDetailsModalSubscrption.unsubscribe();
    }

}
