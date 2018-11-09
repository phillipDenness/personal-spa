import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapeSearchesComponent } from './scrape-searches.component';

describe('ScrapeSearchesComponent', () => {
  let component: ScrapeSearchesComponent;
  let fixture: ComponentFixture<ScrapeSearchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrapeSearchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapeSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
