import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { LoadingIndicatorComponent } from 'src/app/shared-components/loading-indicator/loading-indicator.component';
import { PaintingCardComponent } from './painting-card/painting-card.component';
import { PaintingDetailsModalComponent } from './painting-card/painting-details-modal/painting-details-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { RouterModule, Routes } from '@angular/router';

const galleryRoute: Routes = [
  {
    path: '',
    component: GalleryComponent,
  }
];

@NgModule({
  declarations: [
    GalleryComponent,
    LoadingIndicatorComponent,
    PaintingCardComponent,
    PaintingDetailsModalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forChild(galleryRoute)
  ],
  exports: [RouterModule]
})
export class GalleryModule { }
