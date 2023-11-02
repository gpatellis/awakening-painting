import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';

@Component({
  selector: 'ap-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Home - Awakening Painting';
  
  constructor(
    private loadingIndicatorService: LoadingIndicatorService,
    private titleService: Title,
    private metaTagService: Meta) {}

  ngOnInit(): void {
    this.setTitleAndMetaTag();
    this.loadingIndicatorService.hide();
  }

  setTitleAndMetaTag() {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      {name: 'description', content: 'Home'}
    );
  }

}
