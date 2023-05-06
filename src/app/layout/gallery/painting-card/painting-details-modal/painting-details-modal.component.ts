import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreensizeListeningService } from 'src/app/shared-services/screensize-listening.service';
import { PaintingData, PaintingModalData } from '../../gallery-interfaces';
import { PaintingDetailsModalService } from './painting-details-modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ap-painting-details-modal',
  templateUrl: './painting-details-modal.component.html',
  styleUrls: ['./painting-details-modal.component.scss']
})
export class PaintingDetailsModalComponent implements OnInit, AfterViewInit {
  public paintingModalData!: PaintingModalData;
  isMobileOrTabletView: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PaintingModalData,
  private screensizeListeningService: ScreensizeListeningService,
  private paintingDetailsModalService: PaintingDetailsModalService,
  private router: Router) { }

  ngOnInit(): void {
    this.paintingModalData = this.data;
    this.screensizeListeningService.isMobileOrTabletView$.subscribe((value) => {
      this.isMobileOrTabletView = value;
    });
  }

  ngAfterViewInit(): void {
    this.scrollToTop();
  }

  scrollToTop() {
    setTimeout(() => {
      let top = document.getElementById('top');
      if (top !== null) {
        top.scrollIntoView();
        top = null;
      }
    }, 150);
  }

  getImageWidth(painting: PaintingData) {
    if (this.isMobileOrTabletView)
      return '100%'
    else if(painting.aspectRatio <= 0.5)
      return '19vw';
    else if(painting.aspectRatio > 0.5 && painting.aspectRatio <= 0.74)
      return '25vw';
    else if(painting.aspectRatio > 0.74 && painting.aspectRatio < 0.9)
      return '30vw';
    else if(painting.aspectRatio > 0.9 && painting.aspectRatio < 1.05)
      return '35vw';
    else if (painting.aspectRatio >= 1.05 && painting.aspectRatio < 1.4)
      return '45vw';
    else if (painting.aspectRatio >= 1.4)
      return '50vw';
    else
      return '45vw';
  } 

  closePaintingDetailsModal() {
    this.paintingDetailsModalService.closePaintingDetailsModal$.next(true);
  }

  buyPaintingClicked() {
    this.paintingDetailsModalService.paintingChosenForPurchase = this.paintingModalData.painting;
    this.closePaintingDetailsModal();
    this.router.navigate(['/checkout','shipping']);
  }

}
