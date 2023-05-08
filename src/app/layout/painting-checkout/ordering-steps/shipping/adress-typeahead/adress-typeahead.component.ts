import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {} from "googlemaps";

@Component({
  selector: 'ap-adress-typeahead',
  templateUrl: './adress-typeahead.component.html',
  styleUrls: ['./adress-typeahead.component.scss']
})
export class AdressTypeaheadComponent {
  adressType: string = 'geocode';
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;
  addressToShow: string;

  autocompleteInput: string;
  queryWait: boolean;

  constructor() {
  }

  ngOnInit() {
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
      this.addressToShow = place.toString();
  }
}
