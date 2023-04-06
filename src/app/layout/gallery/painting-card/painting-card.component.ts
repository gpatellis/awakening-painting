import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaintingData } from '../gallery-interfaces';
import { PaintingDetailsModalComponent } from './painting-details-modal/painting-details-modal.component';

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
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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

    openPaintingDetailsModal() {
      if(this.painting.renderedImage) {
        let dialogRef = this.dialog.open(PaintingDetailsModalComponent, {
          data: { 
            painting: this.painting,
            isMobileView: this.isMobileView,
            isTabletView: this.isTabletView
          },
          id: 'painting-details-modal',
          panelClass: 'painting-details-modal'
        });
      }
    }

}
