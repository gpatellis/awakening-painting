import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaintingData, PaintingModalData } from '../../gallery-interfaces';

@Component({
  selector: 'ap-painting-details-modal',
  templateUrl: './painting-details-modal.component.html',
  styleUrls: ['./painting-details-modal.component.scss']
})
export class PaintingDetailsModalComponent implements OnInit {
  public paintingModalData!: PaintingModalData;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PaintingModalData) { }

  ngOnInit(): void {
    this.paintingModalData = this.data;
  }

  getImageHeight(painting: PaintingData) {
    if(painting.aspectRatio < 1) {
      return '100%';
    } 
    return undefined;
  }

  getImageWidth(painting: PaintingData) {
    if(painting.aspectRatio > 1 && painting.aspectRatio < 1.2) {
      return '70%';
    } else if (painting.aspectRatio >= 1.2 && painting.aspectRatio < 1.3) {
      return '80%';
    }else if(painting.aspectRatio >= 1.3 && painting.aspectRatio < 1.4) {
      return '90%';
    } else if (painting.aspectRatio >= 1.4) {
      return '100%';
    }
    return undefined;
  }

}
