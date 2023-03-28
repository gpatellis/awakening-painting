import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScreensizeListeningService } from 'src/app/shared-services/screensize-listening.service';
import { PaintingData, PaintingModalData } from '../../gallery-interfaces';

@Component({
  selector: 'ap-painting-details-modal',
  templateUrl: './painting-details-modal.component.html',
  styleUrls: ['./painting-details-modal.component.scss']
})
export class PaintingDetailsModalComponent implements OnInit {
  public paintingModalData!: PaintingModalData;
  isMobileView: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PaintingModalData,
  private screensizeListeningService: ScreensizeListeningService) { }

  ngOnInit(): void {
    this.paintingModalData = this.data;
    this.screensizeListeningService.isMobileView.subscribe((value) => {
      this.isMobileView = value;
    })
  }

  getImageWidth(painting: PaintingData) {
    if (this.isMobileView) //work here and on modal width
      return '68vw'
    else if(painting.aspectRatio < 0.9)
      return '35vw';
    else if (painting.aspectRatio >= 0.9 && painting.aspectRatio < 1.4)
      return '45vw';
    else if (painting.aspectRatio >= 1.4)
      return '50vw';
    else
      return '45vw';
  } 

}
