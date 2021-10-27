import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingShowAndEditComponent } from './setting-show-and-edit.component';

describe('SettingShowAndEditComponent', () => {
  let component: SettingShowAndEditComponent;
  let fixture: ComponentFixture<SettingShowAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingShowAndEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingShowAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
