import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaintingCheckoutComponent } from './painting-checkout.component';
import { MatIconModule } from '@angular/material/icon';
import { OrderingStatusComponent } from './ordering-status/ordering-status.component';

const paintingCheckoutRoute: Routes = [
  {
    path: '',
    component: PaintingCheckoutComponent,
  }
];

@NgModule({
  declarations: [
    PaintingCheckoutComponent,
    OrderingStatusComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(paintingCheckoutRoute),
    MatIconModule
  ]
})
export class PaintingCheckoutModule { }
