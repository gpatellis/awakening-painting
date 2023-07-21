import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingOptionsComponent } from './shipping-options.component';

describe('ShippingOptionsComponent', () => {
  let component: ShippingOptionsComponent;
  let fixture: ComponentFixture<ShippingOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingOptionsComponent]
    });
    fixture = TestBed.createComponent(ShippingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
