import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, map, pipe, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ADDRESS_VALIDATION_RESPONSE, SHIPPING_SERVICE_ERROR, SHIPPING_SERVICE_INVALID_ADDRESS } from './shipping.model';
import { Router } from '@angular/router';
import { LoadingIndicatorService } from 'src/app/shared-services/loading-indicator/loading-indicator.service';
import { ErrorDialogService } from 'src/app/shared-services/error-dialog/error-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private loadingIndicatorService: LoadingIndicatorService,
    private errorDialogService: ErrorDialogService) { }

  getShippingFormGroup(): FormGroup {
    return new FormGroup({
    address: new FormControl('', Validators.required),
    aptSuite: new FormControl(''),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.email])
    }); 
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
  validateAddress(shippingForm: FormGroup) {
    this.loadingIndicatorService.show();
    this.getAddressValidation(shippingForm).subscribe((addressValidationResponse: ADDRESS_VALIDATION_RESPONSE) => {
      if (addressValidationResponse.body[0].status == "verified") {
        this.router.navigate(['/checkout','payment']);
        this.loadingIndicatorService.hide();
      } else if (addressValidationResponse.body[0].status == "unverified") {
        console.log('entered');
        this.loadingIndicatorService.hide();
        this.errorDialogService.open(SHIPPING_SERVICE_INVALID_ADDRESS);
      }
    });
  }
}
