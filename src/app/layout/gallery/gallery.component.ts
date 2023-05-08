import { Component, OnInit } from '@angular/core';
import { PaintingData } from './gallery-interfaces';
import { PaintingImageService } from './painting-image-service/painting-image.service';
import { ScreensizeListeningService } from 'src/app/shared-services/screensize-listening.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'ap-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  image: any;
  paintingData: PaintingData[] = [];
  browserRefresh: boolean = false;
  isMobileView$: Observable<boolean>;
  isTabletView$: Observable<boolean>;

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

  listenForMobileView(): void {
    this.isMobileView$ = this.screensizeListeningService.isMobileView$.asObservable();
  }

  listenForTableView(): void {
    this.isTabletView$ =  this.screensizeListeningService.isTabletView$.asObservable();
  }

  getPaintingData(): void {
    this.paintingImageService.getPaintingData().subscribe((paintingData) => {
      this.paintingData = paintingData;
      this.paintingImageService.populatePaintingDataWithImages(this.paintingData);
    });
  }

}
