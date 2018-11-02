import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobMapComponent } from './job-map.component';

describe('JobMapComponent', () => {
  let component: JobMapComponent;
  let fixture: ComponentFixture<JobMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
