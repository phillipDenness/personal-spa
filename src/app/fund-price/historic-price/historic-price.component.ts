import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FundPriceService } from '../fund-price.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Fund } from '../model/fund';

@Component({
  selector: 'app-historic-price',
  templateUrl: './historic-price.component.html',
  styleUrls: ['./historic-price.component.css']
})
export class HistoricPriceComponent implements OnInit, OnDestroy {
  valuedate: Date = new Date();
  yesterdaysDate: Date = new Date(this.valuedate.getFullYear(), this.valuedate.getMonth(), this.valuedate.getDate() - 1);
  maxDate: NgbDate = new NgbDate(this.yesterdaysDate.getFullYear(), this.yesterdaysDate.getMonth() + 1, this.yesterdaysDate.getDate());
  lastWeekDate: Date = new Date(this.yesterdaysDate.getFullYear(), this.yesterdaysDate.getMonth(), this.yesterdaysDate.getDate() - 7);

  fromDate: NgbDate = new NgbDate(this.yesterdaysDate.getFullYear(), this.yesterdaysDate.getMonth(), this.yesterdaysDate.getDate() - 7);
  toDate: NgbDate = new NgbDate(this.valuedate.getFullYear(), this.valuedate.getMonth(), this.valuedate.getDate() - 1);
  minDate: NgbDate = new NgbDate(1990, 1, 1);

  private _s3Sub: Subscription;

  @Input('selectedFund')
  selectedFund: Fund;

  constructor(private fundPriceService: FundPriceService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this._s3Sub = this.fundPriceService.s3Response.subscribe(s3Url => {
      this.spinner.hide();
    });
  }

  onGenerateClick() {
    if (this.selectedFund.symbol != null) {
      this.fundPriceService.getHistoricPrice(this.fromDate, this.toDate, this.selectedFund.symbol).subscribe(response => {
        console.log('Waiting for Callback - ' + response.body);
        this.spinner.show();
      });
    }
  }

  ngOnDestroy() {
    this._s3Sub.unsubscribe();
  }
}
