import { Component, OnInit } from '@angular/core';
import { PaintingData } from './gallery-interfaces';
import { PaintingImageServiceService } from './painting-image-service.service';
import { browserRefresh } from '../../app.component';
import { ScreensizeListeningService } from 'src/app/shared-services/screensize-listening.service';


@Component({
  selector: 'ap-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  image: any;
  paintingData: PaintingData[] = [];
  browserRefresh: boolean = false;
  isMobileView = false;

  constructor(
    private paintingImageService: PaintingImageServiceService,
    private screensizeListeningService: ScreensizeListeningService
    ) { }

  ngOnInit(): void {
    this.listenForMobileView();
    this.testForBrowserRefresh();
    let paintingData = JSON.parse(localStorage.getItem('paintingData') as string);
    if (paintingData) {
      this.paintingData = this.paintingImageService.getPaintingImagesFromStorage();
    } else {
      this.getPaintingData();
    }
  }

  listenForMobileView() {
    this.screensizeListeningService.isMobileView.subscribe((isMobileView: boolean) => {
      this.isMobileView = isMobileView;
    });
  }

  getPaintingData() {
    this.paintingImageService.getPaintingData().subscribe((paintingData) => {
      this.paintingData = paintingData;
      this.paintingImageService.populatePaintingDataWithImages(this.paintingData);
    });
  }

  testForBrowserRefresh() {
    this.browserRefresh = browserRefresh;
    if(this.browserRefresh) {
      this.paintingImageService.removePaintingImagesFromLocalStorage();
    }
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
