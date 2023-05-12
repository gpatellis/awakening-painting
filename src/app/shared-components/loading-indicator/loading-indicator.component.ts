import { Component, Input } from '@angular/core';

@Component({
  selector: 'ap-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent {

  @Input() fullPageLoad: boolean = false;

  constructor() { }

}
