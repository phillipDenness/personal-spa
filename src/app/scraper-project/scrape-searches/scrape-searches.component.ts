import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SearchTerms } from '../model/search-terms';
import { ScraperService } from '../scraper.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scrape-searches',
  templateUrl: './scrape-searches.component.html',
  styleUrls: ['./scrape-searches.component.css']
})
export class ScrapeSearchesComponent implements OnInit, OnDestroy {
  datasource: SearchTerms[];
  columns = ['searchName', 'domain', 'tags', 'keywords', 'blockwords'];
  private resolverSubscription: Subscription;

  constructor(private scraperService: ScraperService,
              private actr: ActivatedRoute) {

    this.datasource = [];
    this.resolverSubscription = this.actr.data.subscribe((data: any) => {
      this.scraperService.setApiInformationSubject('Fetched searches from database');
      data.items.body.forEach(element => {
        this.datasource.push(element);
      });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.resolverSubscription) {
      this.resolverSubscription.unsubscribe();
    }
  }

  onScrapeClick(searchTerms: SearchTerms) {
    this.scraperService.setApiInformationSubject('Requesting data from API');
    this.scraperService.doScrape(searchTerms);
  }
}
