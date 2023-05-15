import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { PaintingCardComponent } from './painting-card/painting-card.component';
import { PaintingDetailsModalComponent } from './painting-card/painting-details-modal/painting-details-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingIndicatorModule } from 'src/app/shared-components/loading-indicator/loading-indicator/loading-indicator.module';

const galleryRoute: Routes = [
  {
    path: '',
    component: GalleryComponent,
  }
];

@NgModule({
  declarations: [
    GalleryComponent,
    PaintingCardComponent,
    PaintingDetailsModalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forChild(galleryRoute),
    LoadingIndicatorModule
  ],
  exports: [RouterModule]
})
export class GalleryModule { }
