import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GumtreeProjectComponent } from './gumtree-project.component';

describe('GumtreeProjectComponent', () => {
  let component: GumtreeProjectComponent;
  let fixture: ComponentFixture<GumtreeProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GumtreeProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GumtreeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
