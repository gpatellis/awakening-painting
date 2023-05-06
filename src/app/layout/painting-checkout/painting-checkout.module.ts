import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaintingCheckoutComponent } from './painting-checkout.component';
import { MatIconModule } from '@angular/material/icon';
import { OrderingStatusComponent } from './ordering-status/ordering-status.component';
import { ShippingComponent } from './ordering-steps/shipping/shipping.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MiniPaintingCardComponent } from './mini-painting-card/mini-painting-card.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

const paintingCheckoutRoute: Routes = [
  {
    path: '',
    component: PaintingCheckoutComponent,
    children: [
      {
        path: 'shipping', 
        component: ShippingComponent, 
      }
    ]
  }
];

@NgModule({
  declarations: [
    PaintingCheckoutComponent,
    OrderingStatusComponent,
    ShippingComponent,
    MiniPaintingCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(paintingCheckoutRoute),
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule
  ]
})
export class PaintingCheckoutModule { }
