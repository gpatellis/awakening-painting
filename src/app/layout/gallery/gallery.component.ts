import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaintingData } from './gallery-interfaces';
import { PaintingImageService } from './painting-image-service/painting-image.service';
import { ScreensizeListeningService } from 'src/app/shared-services/screensize-listening/screensize-listening.service';
import { Observable, Subscription } from 'rxjs';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';
import { PaintingCheckoutService } from '../painting-checkout/painting-checkout.service';


@Component({
  selector: 'ap-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  image: any;
  paintingData: PaintingData[] = [];
  browserRefresh: boolean = false;
  isMobileView$: Observable<boolean>;
  isTabletView$: Observable<boolean>;
  getPaintingDataSubscription$: Subscription;

  constructor(
    private paintingImageService: PaintingImageService,
    private screensizeListeningService: ScreensizeListeningService,
    private loadingIndicatorService: LoadingIndicatorService,
    private paintingCheckoutService: PaintingCheckoutService
    ) { }

  ngOnInit(): void {
    this.loadingIndicatorService.show();
    this.paintingCheckoutService.clearAllCheckoutData();
    this.listenForMobileView();
    this.listenForTableView();
    this.getPaintingData();
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
      this.loadingIndicatorService.hide();
      this.paintingImageService.populatePaintingDataWithImages(this.paintingData);
    });
  }

  ngOnDestroy(): void {
    this.getPaintingDataSubscription$.unsubscribe();
  }

}
