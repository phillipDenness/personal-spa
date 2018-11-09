import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSearchComponent } from './create-search.component';

describe('CreateSearchComponent', () => {
  let component: CreateSearchComponent;
  let fixture: ComponentFixture<CreateSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
