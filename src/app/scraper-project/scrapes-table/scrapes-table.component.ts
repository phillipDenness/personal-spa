import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Scrape } from '../model/scrapes';
import { ScraperService } from '../scraper.service';
import { Subscription } from 'rxjs';
import { SearchTerms } from '../model/search-terms';

@Component({
  selector: 'app-scrapes-table',
  templateUrl: './scrapes-table.component.html',
  styleUrls: ['./scrapes-table.component.css']
})
export class ScrapesTableComponent implements OnInit, OnDestroy {
  columns = [{property: 'text', displayText: 'Found text'}, {property: 'tag', displayText: 'Tag'}];
  scrapes: Scrape[];
  searchInfo: SearchTerms;
  private scrapesSubscription: Subscription;
  private searchInfoSubscription: Subscription;

  constructor(private scraperService: ScraperService) {
    this.scrapes = [new Scrape(null, null)];
  }

  ngOnInit() {
    this.scrapesSubscription = this.scraperService.getScrapeSubject()
        .subscribe((scrapes: any) => {
          this.scrapes = scrapes;
          this.scraperService.setApiInformationSubject('Fetched data from API');
      });
    this.searchInfoSubscription = this.scraperService.getSearchInfoSubject()
      .subscribe((searchInfo: SearchTerms) => {
        this.searchInfo = searchInfo;
      });
  }

  ngOnDestroy() {
    if (this.scrapesSubscription) {
      this.scrapesSubscription.unsubscribe();
    }
    if (this.searchInfoSubscription) {
      this.searchInfoSubscription.unsubscribe();
    }
  }
}
