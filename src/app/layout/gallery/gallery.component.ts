import { Component, OnInit } from '@angular/core';
import { PaintingData } from './gallery-interfaces';
import { PaintingImageServiceService } from './painting-image-service.service';

@Component({
  selector: 'ap-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  image: any;
  paintingImages: PaintingData[] = [];
  constructor(
    private paintingImageService: PaintingImageServiceService
    ) { }

  ngOnInit(): void {
    this.getPaintingData();
  }

  getPaintingData() {
    this.paintingImageService.getPaintingData().subscribe((paintingData) => {
      this.paintingImages = this.paintingImageService.populatePaintingDataWithImages(paintingData);
    });
  }
}
