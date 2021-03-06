import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fund } from './model/fund';
import { FundPriceService } from './fund-price.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fund-price',
  templateUrl: './fund-price.component.html',
  styleUrls: ['./fund-price.component.css']
})
export class FundPriceComponent implements OnInit, OnDestroy {

  fundNames: Fund[] = [
    new Fund('Av Artemis Strategic Bond', 'https://www.trustnet.com/factsheets/p/ibb6/av-artemis-strategic-bond-pn-fp', '31475417'),
    new Fund('Av Artemis UK Special Situations', 'https://www.trustnet.com/factsheets/p/lr97/av-artemis-uk-special-situations-fp-pn', '28265271'),
    new Fund('Av AXA Framlington UK Select Opportunities', 'https://www.trustnet.com/factsheets/p/f516/av-axa-framlington-uk-select-opportunities-fp-pn', '28265158'),
    new Fund('Av Baillie Gifford American FP', 'https://www.trustnet.com/factsheets/p/o966/av-baillie-gifford-american-fp-pn', '28265698'),
    new Fund('Av Baillie Gifford International', 'https://www.trustnet.com/factsheets/p/fl95/av-baillie-gifford-international-fp-pn', '28272707'),
    new Fund('Av Baillie Gifford Japanese', 'https://www.trustnet.com/factsheets/p/o965/av-baillie-gifford-japanese-fp-pn', '28265692'),
    new Fund('Av Baillie Gifford Managed', 'https://www.trustnet.com/factsheets/p/fl96/av-baillie-gifford-managed-fp-pn', '28272711'),
    new Fund('Av Baillie Gifford UK Equity Core FP', 'https://www.trustnet.com/factsheets/p/lm27/av-baillie-gifford-uk-equity-core-fp-pn', '28263656'),
    new Fund('Av Balanced Index Enhanced Fund of Funds', 'https://www.trustnet.com/factsheets/p/lr96/av-balanced-index-enhanced-fund-of-funds-fp-pn', '28265175'),
    new Fund('Av Balanced Index Fund of Funds',	'https://www.trustnet.com/factsheets/p/lm09/av-balanced-index-fund-of-funds-fp-pn', '28263657'),
    new Fund('Av Balanced Multi-Asset Fund FP',	'https://www.trustnet.com/factsheets/p/lm24/av-balanced-multi-asset-fp-pn', '28263659'),
    new Fund('Av BlackRock (30:70) Currency Hedged Global Equity (Aq C)', 'https://www.trustnet.com/factsheets/p/0lu1/av-mym-blackrock-3070-currency-hedged-global-equity-tracker-pn', '31766703'),
    new Fund('Av BlackRock (40:60) Global Equity Index (Aquila C)', 'https://www.trustnet.com/factsheets/p/f472/av-blackrock-4060-global-equity-index-tracker-fp-pn', '28265303'),
    new Fund('Av BlackRock (50:50) Global Equity Index (Aquila C)',	'https://www.trustnet.com/factsheets/p/lm81/av-blackrock-5050-global-equity-index-tracker-fp-pn', '28264032'),
    new Fund('Av BlackRock (60:40) Global Equity Index Tracker FP',	'https://www.trustnet.com/factsheets/p/lm64/av-blackrock-6040-global-equity-index-tracker-fp-pn', '28264035'),
    new Fund('Av BlackRock Consensus (Aquila C)', 'https://www.trustnet.com/factsheets/p/lm92/av-blackrock-consensus-fp-pn', '45229707'),
    new Fund('Av BlackRock Corporate Bond All Stocks Index (Aquila C)', 'https://www.trustnet.com/factsheets/p/m4l7/av-blackrock-corporate-bond-all-stocks-index-tracker-fp-pn', '28264154'),
    new Fund('Av BlackRock DC Diversified Growth',	'https://www.trustnet.com/factsheets/p/lbo9/av-blackrock-dc-diversified-growth-fp-pn', '116619629'),
    new Fund('Av BlackRock Emerging Markets Equity (Aquila C)', 'https://www.trustnet.com/factsheets/p/lbp0/av-blackrock-emerging-markets-index-tracker-fp-pn', '51119952'),
    new Fund('Av BlackRock European Equity Index (Aquila C)', 'https://www.trustnet.com/factsheets/p/lm61/av-blackrock-european-equity-index-tracker-fp-pn', '28264031'),
    new Fund('Av BlackRock Institutional Sterling Liquidity',	'https://www.trustnet.com/factsheets/p/f2j8/av-blackrock-institutional-sterling-liquidity-fp-pn', '27262056'),
    new Fund('Av BlackRock Japanese Equity Index (Aquila C)',	'https://www.trustnet.com/factsheets/p/i406/av-blackrock-japanese-equity-index-tracker-fp-pn', '28265628'),
    new Fund('Av BlackRock Market Advantage FP',	'https://www.trustnet.com/factsheets/p/jnsj/av-blackrock-market-advantage-fp-pn', '110963183'),
    new Fund('Av BlackRock Market Advantage Strategy', 'https://www.trustnet.com/factsheets/p/iba8/av-blackrock-market-advantage-strategy-fp-pn', '31475418'),
    new Fund('Av BlackRock Over 15 Year Corporate Bond Index (Aquila C)',	'https://www.trustnet.com/factsheets/p/lm63/av-blackrock-over-15-year-corporate-bond-index-tracker-fp-pn', '28264043'),
    new Fund('Av BlackRock Over 15 Year Gilt Index (Aquila C)',	'https://www.trustnet.com/factsheets/p/lm60/av-blackrock-over-15-year-gilt-index-tracker-fp-pn', '28264052')];

    s3Url: string;
    private _s3Sub: Subscription;

    selectedFund: Fund = new Fund('-- Select fund --', null, null);
    fundPriceResponse: string;

  constructor(private fundPriceService: FundPriceService) {
  }

  ngOnInit() {
    this._s3Sub = this.fundPriceService.s3Response.subscribe(s3Url => {
      console.log('Callback complete - ' + s3Url);
      this.s3Url = s3Url;
    });
  }

  onPriceClick() {
    if (this.selectedFund.fundLink != null) {
      this.fundPriceService.getPrice(this.selectedFund.fundLink).subscribe(response => {
        this.fundPriceResponse = response.body.price;
        console.log(this.fundPriceResponse);
      });
    }
  }

  ngOnDestroy() {
    this._s3Sub.unsubscribe();
  }
}
