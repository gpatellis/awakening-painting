import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, map, pipe, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ADDRESS, ADDRESS_VALIDATION_RESPONSE, CARRIER_RATE, CARRIER_RATES_RESPONSE, SHIPPING_SERVICE_ERROR, SHIPPING_SERVICE_INVALID_ADDRESS } from './shipping.model';
import { Router } from '@angular/router';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';
import { ErrorDialogService } from 'src/app/shared-services/error-dialog/error-dialog.service';
import { PaintingDetailsModalService } from 'src/app/layout/gallery/painting-card/painting-details-modal/painting-details-modal.service';
import { PaintingData } from 'src/app/layout/gallery/gallery-interfaces';
import { OrderingStatusService } from '../../ordering-status/ordering-status.service';
import { ORDERING_STATUS } from '../../painting-checkout.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  matchedAdress: ADDRESS;
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
    aptSuite: new FormControl(''),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    country: new FormControl({value: 'US', disabled: true}, Validators.required),
    phone: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.email])
    }); 
    return this.shippingFormGroup;
  }

  getAddressValidation(shippingForm: FormGroup): Observable<ADDRESS_VALIDATION_RESPONSE> {
    const requestBody =  JSON.parse(`[
      {
        "address_line1": "${shippingForm.get('address')?.value}",
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
      } else if (addressValidationResponse.body[0].status == "unverified") {
        this.loadingIndicatorService.hide();
        this.errorDialogService.open(SHIPPING_SERVICE_INVALID_ADDRESS);
      }
    });
  }

  navigateToPaymentPage(matchedAddress: ADDRESS): void {
    this.router.navigate(['/checkout','payment']);
    this.orderingStatusService.OrderingStatus$.next(ORDERING_STATUS.payment);
    this.matchedAdress = matchedAddress;
    this.loadingIndicatorService.hide();
  }

  getCarrierRates(): Observable<CARRIER_RATE[]> {
    const requestBody = JSON.parse(`
      {
        "ship_to": {
          "name": "${this.shippingFormGroup.get('firstName')?.value} ${this.shippingFormGroup.get('lastName')?.value}",
          "address_line1": "${this.matchedAdress.address_line1}",
          "city_locality": "${this.matchedAdress.city_locality}",
          "state_province": "${this.matchedAdress.state_province}",
          "postal_code": "${this.matchedAdress.postal_code}",
          "country_code": "${this.matchedAdress.country_code}"
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
          return (response as CARRIER_RATES_RESPONSE).body;
        }),
        catchError( error => {
          this.errorDialogService.open(SHIPPING_SERVICE_ERROR)
          return throwError(() => error)
        })
      )
  }
}
