import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagelogComponent } from './messagelog.component';

describe('MessagelogComponent', () => {
  let component: MessagelogComponent;
  let fixture: ComponentFixture<MessagelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagelogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
