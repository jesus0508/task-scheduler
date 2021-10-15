import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowAndEditComponent } from './user-show-and-edit.component';

describe('UserShowAndEditComponent', () => {
  let component: UserShowAndEditComponent;
  let fixture: ComponentFixture<UserShowAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShowAndEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShowAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
