import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniPaintingCardComponent } from './mini-painting-card.component';

describe('MiniPaintingCardComponent', () => {
  let component: MiniPaintingCardComponent;
  let fixture: ComponentFixture<MiniPaintingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniPaintingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPaintingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
