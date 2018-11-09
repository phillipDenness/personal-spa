import { Component, OnInit } from '@angular/core';
import { SearchTerms } from '../model/search-terms';
import { ScraperService } from '../scraper.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scrape-searches',
  templateUrl: './scrape-searches.component.html',
  styleUrls: ['./scrape-searches.component.css']
})
export class ScrapeSearchesComponent implements OnInit {
  datasource: SearchTerms[];
  columns = ['searchName', 'domain', 'tags', 'keywords', 'blockwords'];

  resolverSubscription: Subscription;

  constructor(private scraperService: ScraperService,
              private actr: ActivatedRoute) {

    this.datasource = [];
    this.resolverSubscription = this.actr.data.subscribe((data: any) => {

      data.items.body.forEach(element => {
        this.datasource.push(element);
      });
    });
  }

  ngOnInit() {
  }

  onScrapeClick(searchTerms: SearchTerms) {
    this.scraperService.doScrape(searchTerms);
  }
}
