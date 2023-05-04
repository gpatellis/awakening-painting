import { Component, OnInit } from '@angular/core';
import { PaintingData } from './gallery-interfaces';
import { PaintingImageService } from './painting-image-service/painting-image.service';
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
  isTabletView = false;

  constructor(
    private paintingImageService: PaintingImageService,
    private screensizeListeningService: ScreensizeListeningService
    ) { }

  ngOnInit(): void {
    this.listenForMobileView();
    this.listenForTableView();
    let paintingData = JSON.parse(localStorage.getItem('paintingData') as string);
    if (paintingData) {
      this.paintingData = this.paintingImageService.getPaintingImagesFromStorage();
    } else {
      this.getPaintingData();
    }
  }

  listenForMobileView() {
    this.screensizeListeningService.isMobileView$.subscribe((isMobileView: boolean) => {
      this.isMobileView = isMobileView;
    });
  }

  listenForTableView() {
    this.screensizeListeningService.isTabletView$.subscribe((isTabletView: boolean) => {
      this.isTabletView = isTabletView;
    });
  }

  getPaintingData() {
    this.paintingImageService.getPaintingData().subscribe((paintingData) => {
      this.paintingData = paintingData;
      this.paintingImageService.populatePaintingDataWithImages(this.paintingData);
    });
  }

}
