import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTwoComponent } from './message-two.component';

describe('MessageTwoComponent', () => {
  let component: MessageTwoComponent;
  let fixture: ComponentFixture<MessageTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageTwoComponent]
    });
    fixture = TestBed.createComponent(MessageTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
