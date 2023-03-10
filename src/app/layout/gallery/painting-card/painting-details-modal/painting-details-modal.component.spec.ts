import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingDetailsModalComponent } from './painting-details-modal.component';

describe('PaintingDetailsModalComponent', () => {
  let component: PaintingDetailsModalComponent;
  let fixture: ComponentFixture<PaintingDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
