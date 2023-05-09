import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTypeaheadComponent } from './address-typeahead.component';

describe('AdressTypeaheadComponent', () => {
  let component: AddressTypeaheadComponent;
  let fixture: ComponentFixture<AddressTypeaheadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressTypeaheadComponent]
    });
    fixture = TestBed.createComponent(AddressTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
