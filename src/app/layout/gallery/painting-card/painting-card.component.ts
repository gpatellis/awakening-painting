import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaintingData } from '../gallery-interfaces';
import { PaintingDetailsModalComponent } from './painting-details-modal/painting-details-modal.component';
import { PaintingDetailsModalService } from './painting-details-modal/painting-details-modal.service';

@Component({
  selector: 'ap-painting-card',
  templateUrl: './painting-card.component.html',
  styleUrls: ['./painting-card.component.scss']
})
export class PaintingCardComponent implements OnInit {

  @Input()
  painting!: PaintingData;
  @Input() isMobileView: boolean = false;
  @Input()isTabletView: boolean = false;
  paintingDetailsDialogRef!: MatDialogRef<PaintingDetailsModalComponent>;

  constructor(
    public dialog: MatDialog,
    private paintingDetailsModalService: PaintingDetailsModalService) { }

  ngOnInit(): void {
    this.listenForPaintingDetailsModalClose();
  }

  getImageHeight(painting: PaintingData) {
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

    checkToOpenModal(fromViewDetailsButton: boolean) {
      if(this.painting.renderedImage && !(this.isMobileView || this.isTabletView) && !fromViewDetailsButton) {
        this.openPaintingDetailsModal();
      } else if(this.painting.renderedImage && fromViewDetailsButton) {
        this.openPaintingDetailsModal();
      }
    }

    openPaintingDetailsModal() {
      this.paintingDetailsDialogRef = this.dialog.open(PaintingDetailsModalComponent, {
        data: { 
          painting: this.painting,
          isMobileView: this.isMobileView,
          isTabletView: this.isTabletView
        },
        panelClass: 'painting-details-modal'
      });
    }

    listenForPaintingDetailsModalClose() {
      this.paintingDetailsModalService.closePaintingDetailsModal$.subscribe((closeModal) => {
        if (closeModal && this.paintingDetailsDialogRef)
          this.paintingDetailsDialogRef.close();
      });
    }

}
