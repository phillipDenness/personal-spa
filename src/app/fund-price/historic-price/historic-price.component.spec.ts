import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricPriceComponent } from './historic-price.component';

describe('HistoricPriceComponent', () => {
  let component: HistoricPriceComponent;
  let fixture: ComponentFixture<HistoricPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
