import { Component, OnInit } from '@angular/core';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';

@Component({
  selector: 'ap-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private loadingIndicatorService: LoadingIndicatorService) {}

  ngOnInit(): void {
    this.loadingIndicatorService.hide();
  }

}
