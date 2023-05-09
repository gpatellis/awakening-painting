import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaintingCheckoutComponent } from './painting-checkout.component';
import { MatIconModule } from '@angular/material/icon';
import { OrderingStatusComponent } from './ordering-status/ordering-status.component';
import { ShippingComponent } from './ordering-steps/shipping/shipping.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MiniPaintingCardComponent } from './mini-painting-card/mini-painting-card.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddressTypeaheadComponent } from './ordering-steps/shipping/address-typeahead/address-typeahead.component';

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
    MiniPaintingCardComponent,
    AddressTypeaheadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(paintingCheckoutRoute),
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    FormsModule
  ]
})
export class PaintingCheckoutModule { }
