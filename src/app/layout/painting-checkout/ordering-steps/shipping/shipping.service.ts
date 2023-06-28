import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, map, pipe, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ADDRESS_VALIDATION_RESPONSE } from './shipping.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private httpClient: HttpClient) { }

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

  validateAddress(shippingForm: FormGroup): Observable<ADDRESS_VALIDATION_RESPONSE> {
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
          return throwError(() => error)
        })
      )
  }
}
