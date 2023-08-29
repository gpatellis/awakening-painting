import {  ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ShippingService } from './shipping.service';
import { StripeService } from '../../stripe/stripe.service';
import { StripeAddressElement, StripeAddressElementChangeEvent, StripeElements } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';


@Component({
  selector: 'ap-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit, OnDestroy {
  shippingForm: FormGroup = this.shippingService.getShippingFormGroup();
  shippingAddressElement: StripeAddressElement;
  stripeElementsSubscription$: Subscription;

  constructor(
    private cd: ChangeDetectorRef, 
    private shippingService: ShippingService,
    private stripeService: StripeService) {
  }

  ngOnInit() {
    this.checkShippingDataToPopulateForm();
    this.loadStripeShippingAddressElement();
  }

  loadStripeShippingAddressElement(): void {
    this.stripeElementsSubscription$ = this.stripeService.stripeElements$.subscribe((elements: any) => {
      if(elements) {
        let shippingOptions = { 
          mode: 'shipping',
          autocomplete: {
            mode: 'google_maps_api',
            apiKey: environment.googleMapsApi.apiKey
          },
          allowedCountries: ['US'],
          defaultValues: {
            name: this.shippingForm.get('fullName')?.value,
            address: {
              line1: this.shippingForm.get('address')?.value,
              line2: this.shippingForm.get('address_line2')?.value,
              city: this.shippingForm.get('city')?.value,
              state: this.shippingForm.get('state')?.value,
              postal_code: this.shippingForm.get('zip')?.value,
              country: this.shippingForm.get('country')?.value,
            },
          },
        };
        this.shippingAddressElement = elements.create('address', shippingOptions);
        this.shippingAddressElement.mount('#shipping-address-element');
    
        this.listenForAddressElementComplete();
      }
    });
  }

  checkShippingDataToPopulateForm() {
    this.shippingService.populateShippingAddressToShippingForm();
  }

  listenForAddressElementComplete(): void {
    this.shippingAddressElement.on('change', (event: StripeAddressElementChangeEvent) => {
      this.populateAddressInfo(event);
    });
  }

  populateAddressInfo(addressChangeEvent: StripeAddressElementChangeEvent): void {
    this.shippingForm.setValue({
      address: addressChangeEvent.value.address.line1,
      address_line2: addressChangeEvent.value.address.line2,
      city: addressChangeEvent.value.address.city,
      state: addressChangeEvent.value.address.state,
      zip: addressChangeEvent.value.address.postal_code,
      country: addressChangeEvent.value.address.country,
      fullName: addressChangeEvent.value.name,
      emailAddress: this.shippingForm.get('emailAddress')?.value
    });
    this.cd.detectChanges();
  }

  getErrorMessage(formControlName: string, label: string): string | undefined {
    if (this.shippingForm.get(formControlName) && (this.shippingForm.get(formControlName)?.hasError)) {
      return `You must enter ${label}`;
    } else 
      return;
  }

  isFormControlError(formControlName: string): boolean | undefined {
    return this.shippingForm.get(formControlName)?.invalid && this.shippingForm.get(formControlName)?.touched;
  }

  submitShippingForm(): void {
    this.shippingService.validateAddress(this.shippingForm);
  }

  ngOnDestroy(): void {
    if(this.shippingAddressElement) {
      this.shippingAddressElement.destroy();
    }
    this.stripeElementsSubscription$.unsubscribe();
  }

}
