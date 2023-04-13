import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingCheckoutComponent } from './painting-checkout.component';

describe('PaintingCheckoutComponent', () => {
  let component: PaintingCheckoutComponent;
  let fixture: ComponentFixture<PaintingCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
