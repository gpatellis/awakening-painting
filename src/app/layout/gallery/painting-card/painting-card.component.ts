import { Component, Input, OnInit } from '@angular/core';
import { PaintingData } from '../gallery-interfaces';

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
  constructor() { }

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

}
