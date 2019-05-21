import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historic-price',
  templateUrl: './historic-price.component.html',
  styleUrls: ['./historic-price.component.css']
})
export class HistoricPriceComponent implements OnInit {

  valuedate: Date = new Date();
  todaysDate: NgbDate = new NgbDate(this.valuedate.getFullYear(), this.valuedate.getMonth(), this.valuedate.getDate());
  lastWeekDate: Date = new Date(this.valuedate.getFullYear(), this.valuedate.getMonth(), this.valuedate.getDate() - 7);

  startDate: NgbDateStruct;
  minDate: NgbDate = new NgbDate(1990, 1, 1);

  constructor() {}

  ngOnInit() {
  }

  onStartDateSelect(event: Event) {
    // this.startDate = event.
  }

  onEndDateSelect() {
    
  }
}
