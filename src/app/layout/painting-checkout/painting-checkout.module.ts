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
import { PaymentComponent } from './ordering-steps/payment/payment.component';
import { ErrorDialogModule } from 'src/app/shared-components/loading-indicator/loading-indicator/error-dialog/error-dialog/error-dialog.module';
import { ErrorDialogService } from 'src/app/shared-services/error-dialog/error-dialog.service';
import { ShippingService } from './ordering-steps/shipping/shipping.service';
import { LoadingIndicatorModule } from 'src/app/shared-components/loading-indicator/loading-indicator/loading-indicator.module';
import { ShippingOptionsComponent } from './ordering-steps/payment/shipping-options/shipping-options.component';
import { MatRadioModule } from '@angular/material/radio';
import { CardInputComponent } from './ordering-steps/payment/card-input/card-input.component';
import { StripeService } from './stripe/stripe.service';
import { ConfirmationComponent } from './ordering-steps/confirmation/confirmation.component';
import { paymentGuard } from './ordering-steps/payment/payment.guard';
import { confirmationGuard } from './ordering-steps/confirmation/confirmation.guard';
import { ShippingSummaryComponent } from './ordering-steps/confirmation/shipping-summary/shipping-summary.component';
import { PaymentSummaryComponent } from './ordering-steps/confirmation/payment-summary/payment-summary.component';
import { OrderCompleteComponent } from './ordering-steps/order-complete/order-complete.component';

const paintingCheckoutRoute: Routes = [
  {
    path: '',
    component: PaintingCheckoutComponent,
    children: [
      {
        path: 'shipping', 
        component: ShippingComponent, 
      },
      {
        path: 'payment', 
        component: PaymentComponent,
        canActivate: [paymentGuard]
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
        canActivate: [confirmationGuard]
      },
      {
        path: 'order-complete',
        component: OrderCompleteComponent,
        canActivate: []
      },
      { path: '', pathMatch: 'full', redirectTo: 'shipping' },
      { path: '**', redirectTo: 'shipping' }
    ]
  }
];

@NgModule({
  declarations: [
    PaintingCheckoutComponent,
    OrderingStatusComponent,
    ShippingComponent,
    MiniPaintingCardComponent,
    AddressTypeaheadComponent,
    PaymentComponent,
    ShippingOptionsComponent,
    CardInputComponent,
    ConfirmationComponent,
    ShippingSummaryComponent,
    PaymentSummaryComponent
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
    FormsModule,
    ErrorDialogModule,
    LoadingIndicatorModule,
    MatRadioModule
  ],
  providers: [
    ErrorDialogService,
    ShippingService,
    StripeService
  ]
})
export class PaintingCheckoutModule { }
