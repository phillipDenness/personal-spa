import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCardsComponent } from './welcome-cards.component';

describe('AboutCardsComponent', () => {
  let component: AboutCardsComponent;
  let fixture: ComponentFixture<AboutCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
