import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ADDRESS, ADDRESS_VALIDATION_RESPONSE, CARRIER_RATE, CARRIER_RATES_RESPONSE } from './shipping.model';
import { Router } from '@angular/router';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';
import { ErrorDialogService } from 'src/app/shared-services/error-dialog/error-dialog.service';
import { PaintingDetailsModalService } from 'src/app/layout/gallery/painting-card/painting-details-modal/painting-details-modal.service';
import { PaintingData } from 'src/app/layout/gallery/gallery-interfaces';
import { OrderingStatusService } from '../../ordering-status/ordering-status.service';
import { ORDERING_STATUS } from '../../painting-checkout.model';
import { SHIPPING_SERVICE_ERROR, SHIPPING_SERVICE_INVALID_ADDRESS } from 'src/app/api-error-messages.constants';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  matchedAddress: ADDRESS;
  shippingFormGroup: FormGroup;
  paintingChosenForPurchase: PaintingData = this.paintingDetailsModalService.getPaintingSelectedForPurchaseFromSessionStorage();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private loadingIndicatorService: LoadingIndicatorService,
    private errorDialogService: ErrorDialogService,
    private paintingDetailsModalService: PaintingDetailsModalService,
    private orderingStatusService: OrderingStatusService) {
     }

  getShippingFormGroup(): FormGroup {
    this.shippingFormGroup = new FormGroup({
    address: new FormControl('', Validators.required),
    address_line2: new FormControl(''),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zip: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5), Validators.pattern("^\\d{5}(-{0,1}\\d{4})?$")]),
    country: new FormControl({value: 'US', disabled: true}, Validators.required),
    fullName: new FormControl('', Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.email])
    }); 
    return this.shippingFormGroup;
  }

  isShippingFormValid() {
    if(this.shippingFormGroup)
      return this.shippingFormGroup.valid;
    return false;
  }

  getAddressValidation(shippingForm: FormGroup): Observable<ADDRESS_VALIDATION_RESPONSE> {
    const requestBody =  JSON.parse(`[
      {
        "address_line1": "${shippingForm.get('address')?.value} ${shippingForm.get('address_line2')?.value}",
        "city_locality": "${shippingForm.get('city')?.value}",
        "state_province": "${shippingForm.get('state')?.value}",
        "postal_code": "${shippingForm.get('zip')?.value}",
        "country_code": "${shippingForm.get('country')?.value}"
      }
    ]`);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(
      environment.getAddressValidationEndpoint, requestBody, {'headers':headers}).pipe(
        map((response) => {
          return response as ADDRESS_VALIDATION_RESPONSE;
        }),
        catchError( error => {
          this.loadingIndicatorService.hide();
          this.errorDialogService.open(SHIPPING_SERVICE_ERROR)
          return throwError(() => error)
        })
      )
  }

  validateAddress(shippingForm: FormGroup): void {
    this.loadingIndicatorService.show();
    this.getAddressValidation(shippingForm).subscribe((addressValidationResponse: ADDRESS_VALIDATION_RESPONSE) => {
      if (addressValidationResponse.body[0].status == "verified") {
        this.navigateToPaymentPage(addressValidationResponse.body[0].matched_address);
      } else if (addressValidationResponse.body[0].status == "unverified" || addressValidationResponse.body[0].status == "error") {
        this.loadingIndicatorService.hide();
        this.errorDialogService.open(SHIPPING_SERVICE_INVALID_ADDRESS);
      }
    });
  }

  navigateToPaymentPage(matchedAddress: ADDRESS): void {
    this.router.navigate(['/checkout','payment']);
    this.storeShippingAddressInSessionStorage(matchedAddress);
    this.orderingStatusService.OrderingStatus$.next(ORDERING_STATUS.payment);
    this.matchedAddress = matchedAddress;
  }

  storeShippingAddressInSessionStorage(shippingAddress: ADDRESS) {
    shippingAddress.name = `${this.shippingFormGroup.get('fullName')?.value}`;
    shippingAddress.phone = `${this.shippingFormGroup.get('phone')?.value}`
    sessionStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
  }

  getShippingAddressFromSessionStorage() {
    let shippingAddressString = sessionStorage.getItem('shippingAddress');
    if(shippingAddressString?.length) {
      let shippingAddress = JSON.parse(shippingAddressString as string);
      this.matchedAddress = shippingAddress as ADDRESS;
      return true;
    }
    return false;
  }

  getCarrierRates(): Observable<CARRIER_RATE[]> {
    const requestBody = JSON.parse(`
      {
        "ship_to": {
          "name": "${this.matchedAddress.name}",
          "address_line1": "${this.matchedAddress.address_line1} ${this.matchedAddress.address_line2}",
          "city_locality": "${this.matchedAddress.city_locality}",
          "state_province": "${this.matchedAddress.state_province}",
          "postal_code": "${this.matchedAddress.postal_code}",
          "country_code": "${this.matchedAddress.country_code}"
        },
        "packages": [
          {
            "weight": {
              "value": ${Number(this.paintingChosenForPurchase.weight)},
              "unit": "${this.paintingChosenForPurchase.weightUnit}"
            },
            "dimensions": {
              "length": ${Number(this.paintingChosenForPurchase.length)},
              "width": ${Number(this.paintingChosenForPurchase.width)},
              "height": ${Number(this.paintingChosenForPurchase.height)},
              "unit": "${this.paintingChosenForPurchase.distanceUnit}"
            }
          }
        ]
      }`);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(
      environment.getCarrierRatesEndpoint, requestBody, {'headers':headers}).pipe(
        map((response) => {
          this.massageCarrierRatesTimeAndDay((response as CARRIER_RATES_RESPONSE).body);
          return (response as CARRIER_RATES_RESPONSE).body;
        }),
        catchError( error => {
          this.errorDialogService.open(SHIPPING_SERVICE_ERROR);
          this.router.navigate(['/checkout','shipping']);
          return throwError(() => error)
        })
      )
  }

  massageCarrierRatesTimeAndDay(carrierRates: CARRIER_RATE[]) {
    carrierRates.forEach((rate) => {
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
      rate.estimated_delivery_date = new Date(rate.estimated_delivery_date).toLocaleDateString('en-us', options);
    });
  }
}
