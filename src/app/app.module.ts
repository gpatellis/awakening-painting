import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { HamburgerMenuComponent } from './layout/toolbar/hamburger-menu/hamburger-menu/hamburger-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoadingIndicatorModule } from './shared-components/loading-indicator/loading-indicator/loading-indicator.module';
import { ContactComponent } from './layout/contact/contact.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ToolbarComponent,
    HamburgerMenuComponent,
    ContactComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    LoadingIndicatorModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
