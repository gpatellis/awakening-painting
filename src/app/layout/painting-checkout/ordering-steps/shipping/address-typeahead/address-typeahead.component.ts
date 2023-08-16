import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import {} from "googlemaps";
import { GOOGLE_ADDRESS_RESPONSE } from '../../../painting-checkout.model';

@Component({
  selector: 'ap-adress-typeahead',
  templateUrl: './address-typeahead.component.html',
  styleUrls: ['./address-typeahead.component.scss']
})
export class AddressTypeaheadComponent implements AfterViewInit {
  addressType: string = 'address';
  @Output() setAddress: EventEmitter<GOOGLE_ADDRESS_RESPONSE> = new EventEmitter();
  @ViewChild('addresstext') addresstext: ElementRef;
  autocompleteInput: string;
  queryWait: boolean;

  constructor() {
  }

  ngAfterViewInit() {
      this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
      const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
          {
              componentRestrictions: { country: 'US' },
              types: [this.addressType]  // 'establishment' / 'address' / 'geocode'
          });
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const address = autocomplete.getPlace();
        this.addresstext.nativeElement.value = `${address.address_components?.find((addressComponent) => addressComponent.types[0] == 'street_number')?.long_name} ${address.address_components?.find((addressComponent) => addressComponent.types[0] == 'route')?.long_name}`;
        this.invokeEvent(address);
      });
  }

  invokeEvent(address: Object) {
      this.setAddress.emit(address as GOOGLE_ADDRESS_RESPONSE);
  }
}
