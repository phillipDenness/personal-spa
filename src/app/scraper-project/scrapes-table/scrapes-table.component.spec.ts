import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapesTableComponent } from './scrapes-table.component';

describe('ScrapesTableComponent', () => {
  let component: ScrapesTableComponent;
  let fixture: ComponentFixture<ScrapesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrapesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
