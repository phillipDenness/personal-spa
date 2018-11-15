import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorplanScannerComponent } from './floorplan-scanner.component';

describe('FloorplanScannerComponent', () => {
  let component: FloorplanScannerComponent;
  let fixture: ComponentFixture<FloorplanScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorplanScannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorplanScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
