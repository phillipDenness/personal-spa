import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historic-price',
  templateUrl: './historic-price.component.html',
  styleUrls: ['./historic-price.component.css']
})
export class HistoricPriceComponent implements OnInit {
  valuedate: Date = new Date();
  yesterdaysDate: Date = new Date(this.valuedate.getFullYear(), this.valuedate.getMonth(), this.valuedate.getDate() - 1);
  maxDate: NgbDate = new NgbDate(this.yesterdaysDate.getFullYear(), this.yesterdaysDate.getMonth() + 1, this.yesterdaysDate.getDate());
  lastWeekDate: Date = new Date(this.yesterdaysDate.getFullYear(), this.yesterdaysDate.getMonth(), this.yesterdaysDate.getDate() - 7);

  startDate: NgbDate;
  endDate: NgbDate;
  minDate: NgbDate = new NgbDate(1990, 1, 1);

  constructor() {}

  ngOnInit() {
  }

  onClick() {
    console.log('From: ' + this.startDate.day + ' To: ' + this.endDate.day);
  }
}
