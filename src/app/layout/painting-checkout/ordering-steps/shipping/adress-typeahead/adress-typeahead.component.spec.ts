import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressTypeaheadComponent } from './adress-typeahead.component';

describe('AdressTypeaheadComponent', () => {
  let component: AdressTypeaheadComponent;
  let fixture: ComponentFixture<AdressTypeaheadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdressTypeaheadComponent]
    });
    fixture = TestBed.createComponent(AdressTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
