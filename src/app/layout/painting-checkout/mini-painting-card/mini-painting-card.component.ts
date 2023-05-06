import { Component, Input, OnInit } from '@angular/core';
import { PaintingData } from '../../gallery/gallery-interfaces';

@Component({
  selector: 'ap-mini-painting-card',
  templateUrl: './mini-painting-card.component.html',
  styleUrls: ['./mini-painting-card.component.scss']
})
export class MiniPaintingCardComponent implements OnInit {

  constructor() { }

  @Input() paintingData: PaintingData;


  ngOnInit(): void {
  }

}
