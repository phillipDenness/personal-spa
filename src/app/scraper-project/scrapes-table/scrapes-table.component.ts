import { Component, OnInit } from '@angular/core';
import { Scrape } from '../model/scrapes';
import { ScraperService } from '../scraper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scrapes-table',
  templateUrl: './scrapes-table.component.html',
  styleUrls: ['./scrapes-table.component.css']
})
export class ScrapesTableComponent implements OnInit {
  columns = [{property: 'text', displayText: 'Found text'}, {property: 'tag', displayText: 'Tag'}];
  scrapes: Scrape[];
  scrapesSubscription: Subscription;

  constructor(private scraperService: ScraperService) {
    this.scrapes = [new Scrape(null, null)];
  }

  ngOnInit() {
    this.scrapesSubscription = this.scraperService.scrapesSubject
        .subscribe((scrapes: any) => {
          this.scrapes = scrapes;
      });
  }
}
