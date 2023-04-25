import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingStatusComponent } from './ordering-status.component';

describe('OrderingStatusComponent', () => {
  let component: OrderingStatusComponent;
  let fixture: ComponentFixture<OrderingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderingStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
