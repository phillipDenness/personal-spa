import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundPriceComponent } from './fund-price.component';

describe('FundPriceComponent', () => {
  let component: FundPriceComponent;
  let fixture: ComponentFixture<FundPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
