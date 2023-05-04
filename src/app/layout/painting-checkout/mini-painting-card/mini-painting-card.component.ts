import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PaintingData } from '../../gallery/gallery-interfaces';

@Component({
  selector: 'ap-mini-painting-card',
  templateUrl: './mini-painting-card.component.html',
  styleUrls: ['./mini-painting-card.component.scss']
})
export class MiniPaintingCardComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef) { }

  @Input() paintingData: PaintingData;


  ngOnInit(): void {
  }

}
