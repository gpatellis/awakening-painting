import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PaintingImageServiceService } from './painting-image-service.service';

@Component({
  selector: 'ap-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  image: any;
  constructor(
    private paintingImageService: PaintingImageServiceService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.getAllGalleryImages();
  }

  getAllGalleryImages() {
    this.paintingImageService.getAllGalleryImages().subscribe((picture) => {
      let objectURL = URL.createObjectURL(picture as Blob);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
}
