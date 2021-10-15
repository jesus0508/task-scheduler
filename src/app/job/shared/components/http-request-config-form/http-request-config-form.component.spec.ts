import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpRequestConfigFormComponent } from './http-request-config-form.component';

describe('HttpRequestConfigFormComponent', () => {
  let component: HttpRequestConfigFormComponent;
  let fixture: ComponentFixture<HttpRequestConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpRequestConfigFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpRequestConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
