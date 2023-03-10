import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { HamburgerMenuComponent } from './layout/toolbar/hamburger-menu/hamburger-menu/hamburger-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryComponent } from './layout/gallery/gallery.component';
import { AboutComponent } from './layout/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingIndicatorComponent } from './shared-components/loading-indicator/loading-indicator.component';
import { PaintingCardComponent } from './layout/gallery/painting-card/painting-card.component';
import { PaintingDetailsModalComponent } from './layout/gallery/painting-card/painting-details-modal/painting-details-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ToolbarComponent,
    HamburgerMenuComponent,
    GalleryComponent,
    AboutComponent,
    LoadingIndicatorComponent,
    PaintingCardComponent,
    PaintingDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
