import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaintingData } from './gallery-interfaces';
import { PaintingImageService } from './painting-image-service/painting-image.service';
import { ScreensizeListeningService } from 'src/app/shared-services/screensize-listening/screensize-listening.service';
import { Observable, Subscription } from 'rxjs';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';
import { PaintingCheckoutService } from '../painting-checkout/painting-checkout.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'ap-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  image: any;
  paintingData: PaintingData[] = [];
  paintingDataToDisplay: PaintingData[] = [];
  browserRefresh: boolean = false;
  isMobileView$: Observable<boolean>;
  isTabletView$: Observable<boolean>;
  getPaintingDataSubscription$: Subscription;

  totalNumberOfPaintings = 0;
  pageSize = 12;
  pageIndex = 0;
  pageSizeOptions = [12];
  showFirstLastButtons = true;

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
    this.isTabletView$ = this.screensizeListeningService.isTabletView$.asObservable();
  }

  getPaintingData(): void {
    this.getPaintingDataSubscription$ = this.paintingImageService.getPaintingData().subscribe((paintingData) => {
      this.paintingData = paintingData;
      this.handleInitialPageLoad(paintingData);
    });
  }

  handleInitialPageLoad(paintingData: PaintingData[]) {
    this.totalNumberOfPaintings = paintingData.length;
    this.paintingDataToDisplay = paintingData.slice(0,this.pageSize);
    this.loadingIndicatorService.hide();
    this.paintingImageService.populatePaintingDataWithImages(this.paintingDataToDisplay);
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.paintingDataToDisplay = this.paintingData.slice(event.pageIndex * this.pageSize, ((event.pageIndex + 1) * this.pageSize));
    this.paintingImageService.populatePaintingDataWithImages(this.paintingDataToDisplay);
    document.getElementsByClassName('content')[0].scrollTo(0,0);
  }

  ngOnDestroy(): void {
    this.getPaintingDataSubscription$.unsubscribe();
  }

}
