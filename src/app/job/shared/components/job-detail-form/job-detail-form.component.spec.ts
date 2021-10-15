import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailFormComponent } from './job-detail-form.component';

describe('JobDetailFormComponent', () => {
  let component: JobDetailFormComponent;
  let fixture: ComponentFixture<JobDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
