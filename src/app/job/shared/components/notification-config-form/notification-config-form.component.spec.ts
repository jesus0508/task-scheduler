import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationConfigFormComponent } from './notification-config-form.component';

describe('NotificationConfigFormComponent', () => {
  let component: NotificationConfigFormComponent;
  let fixture: ComponentFixture<NotificationConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationConfigFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
