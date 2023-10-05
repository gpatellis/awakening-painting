import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterState } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaintingImageService } from './layout/gallery/painting-image-service/painting-image.service';
import { LoadingIndicatorService } from './shared-services/loading-indicator/loading-indicator.service';
import { Title } from '@angular/platform-browser';
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
    private errorDialogService: ErrorDialogService
    ) {
      this.handleRouteEvents();
  }

  ngOnInit(): void {
    this.listenForLoadingIndicator();
  }

  listenForLoadingIndicator(): void {
    this.isLoadingIndicatorShowingSubscription$ = this.loadingIndicatorService.isLoadingIndicatorShowing$.subscribe((showLoadingIndicator: boolean) => {
      this.showLoadingIndicator = showLoadingIndicator;
      this.cd.detectChanges();
    });
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
