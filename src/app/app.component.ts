import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaintingImageService } from './layout/gallery/painting-image-service/painting-image.service';

@Component({
  selector: 'ap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'awakening-painting';
  subscription: Subscription;
  browserRefresh: boolean = false;

  constructor(private router: Router, private paintingImageService: PaintingImageService ) {
    this.subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.browserRefresh = !router.navigated;
          if(this.browserRefresh) {
            this.paintingImageService.removePaintingImagesFromLocalStorage();
          }
        }
    });
  }
}
