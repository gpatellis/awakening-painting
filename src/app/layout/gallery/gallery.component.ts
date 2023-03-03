import { Component, OnInit } from '@angular/core';
import { PaintingData } from './gallery-interfaces';
import { PaintingImageServiceService } from './painting-image-service.service';
import { browserRefresh } from '../../app.component';

@Component({
  selector: 'ap-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  image: any;
  paintingData: PaintingData[] = [];
  browserRefresh: boolean = false;

  constructor(
    private paintingImageService: PaintingImageServiceService) { }

  ngOnInit(): void {
    this.testForBrowserRefresh();
    let paintingData = JSON.parse(localStorage.getItem('paintingData') as string);
    if (paintingData) {
      this.paintingData = this.paintingImageService.getPaintingImagesFromStorage();
    } else {
      this.getPaintingData();
    }
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

}
