import { Component, OnInit } from '@angular/core';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';

@Component({
  selector: 'ap-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private loadingIndicatorService: LoadingIndicatorService) {}

  ngOnInit(): void {
    this.loadingIndicatorService.hide();
  }

}
