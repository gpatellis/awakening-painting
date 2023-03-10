import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaintingModalData } from '../../gallery-interfaces';

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

}
