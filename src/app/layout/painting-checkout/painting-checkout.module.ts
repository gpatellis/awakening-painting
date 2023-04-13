import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaintingCheckoutComponent } from './painting-checkout.component';

const paintingCheckoutRoute: Routes = [
  {
    path: '',
    component: PaintingCheckoutComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(paintingCheckoutRoute)
  ]
})
export class PaintingCheckoutModule { }
