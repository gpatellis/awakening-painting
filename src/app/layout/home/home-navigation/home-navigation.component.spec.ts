import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNavigationComponent } from './home-navigation.component';

describe('HomeNavigationComponent', () => {
  let component: HomeNavigationComponent;
  let fixture: ComponentFixture<HomeNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeNavigationComponent]
    });
    fixture = TestBed.createComponent(HomeNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
