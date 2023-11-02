import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterState } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaintingImageService } from './layout/gallery/painting-image-service/painting-image.service';
import { LoadingIndicatorService } from './shared-services/loading-indicator/loading-indicator.service';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ErrorDialogService } from './shared-services/error-dialog/error-dialog.service';

@Component({
  selector: 'ap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit{
  title = 'awakening-painting';
  browserRefresh: boolean = false;
  isLoadingIndicatorShowingSubscription$: Subscription;
  routerEventsSubscription$: Subscription;
  showLoadingIndicator: boolean;
  isPaintingDataLoadingError$ = this.errorDialogService.isPaintingDataError$;

  constructor(
    private router: Router, 
    public paintingImageService: PaintingImageService,
    private loadingIndicatorService: LoadingIndicatorService,
    private cd: ChangeDetectorRef,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    private errorDialogService: ErrorDialogService,
    private metaTagService: Meta
    ) {
      this.handleRouteEvents();
  }

  ngOnInit(): void {
    this.setMetaTagsForSEO();
    this.listenForLoadingIndicator();
    this.loadingIndicatorService.show();
  }

  listenForLoadingIndicator(): void {
    this.isLoadingIndicatorShowingSubscription$ = this.loadingIndicatorService.isLoadingIndicatorShowing$.subscribe((showLoadingIndicator: boolean) => {
      this.showLoadingIndicator = showLoadingIndicator;
      this.cd.detectChanges();
    });
  }

  setMetaTagsForSEO() {
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Awakening, Painting, Awakening Painting, Awakening Art, Art, Painting, awakeningpainting, awakeningpainting.com'},
      { name: 'robots', content: 'index, follow'},
      { name: 'author', content: 'Greg Patellis'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1'},
      { name: 'date', content: '2023-11-02', scheme: 'YYYY-MM-DD'},
      { name: 'charset', content: 'UTF-8'},
    ])
  }
  ///////// GOOGLE ANALYTICS ////////////
  
  handleRouteEvents() {
    this.routerEventsSubscription$ = this.router.events.subscribe(event => {
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
    this.isLoadingIndicatorShowingSubscription$.unsubscribe();
    this.routerEventsSubscription$.unsubscribe();
  }
}
