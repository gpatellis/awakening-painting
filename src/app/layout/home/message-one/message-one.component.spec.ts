import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageOneComponent } from './message-one.component';

describe('MessageOneComponent', () => {
  let component: MessageOneComponent;
  let fixture: ComponentFixture<MessageOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageOneComponent]
    });
    fixture = TestBed.createComponent(MessageOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
