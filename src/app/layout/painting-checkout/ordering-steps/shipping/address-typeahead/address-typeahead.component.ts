import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {} from "googlemaps";

@Component({
  selector: 'ap-adress-typeahead',
  templateUrl: './address-typeahead.component.html',
  styleUrls: ['./address-typeahead.component.scss']
})
export class AddressTypeaheadComponent implements AfterViewInit {
  adressType: string = 'address';
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

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
              types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
          });
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
          const place = autocomplete.getPlace();
          this.invokeEvent(place);
      });
  }

  invokeEvent(place: Object) {
      this.setAddress.emit(place);
  }
}
