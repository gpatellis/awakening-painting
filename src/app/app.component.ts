import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PaintingImageService } from './layout/gallery/painting-image-service/painting-image.service';
import { LoadingIndicatorService } from './shared-services/loading-indicator/loading-indicator.service';

@Component({
  selector: 'ap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit{
  title = 'awakening-painting';
  refreshSubscription: Subscription;
  browserRefresh: boolean = false;
  isLoadingIndicatorShowingSubscription: Subscription;
  showLoadingIndicator: boolean;

  constructor(private router: Router, public paintingImageService: PaintingImageService,
    private loadingIndicatorService: LoadingIndicatorService,
    private cd: ChangeDetectorRef ) {
    this.refreshSubscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.browserRefresh = !router.navigated;
          if(this.browserRefresh) {
            this.paintingImageService.removePaintingImagesFromLocalStorage();
          }
        }
    });
  }

  ngOnInit(): void {
    this.listenForLoadingIndicator();
  }

  listenForLoadingIndicator(): void {
    this.isLoadingIndicatorShowingSubscription = this.loadingIndicatorService.isLoadingIndicatorShowing$.subscribe((showLoadingIndicator: boolean) => {
      this.showLoadingIndicator = showLoadingIndicator;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
    this.isLoadingIndicatorShowingSubscription.unsubscribe();
  }
}
