import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterState } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaintingImageService } from './layout/gallery/painting-image-service/painting-image.service';
import { LoadingIndicatorService } from './shared-services/loading-indicator/loading-indicator.service';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

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
    private cd: ChangeDetectorRef,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document) {
      this.handleRouteEvents();
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
  ///////// GOOGLE ANALYTICS ////////////
  
  handleRouteEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        this.titleService.setTitle(title);
        gtag('event', 'page_view', {
          page_title: title,
          page_path: event.urlAfterRedirects,
          page_location: this.document.location.href
        })
      }
    });
  }

  getTitle(state: RouterState, parent: ActivatedRoute): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
      data.push(parent.snapshot.data['title']);
    }
    if (state && parent && parent.firstChild) {
      data.push(...this.getTitle(state, parent.firstChild));
    }
    return data;
  }

  //////////////////////////////////////

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
    this.isLoadingIndicatorShowingSubscription.unsubscribe();
  }
}
