import { Component, OnInit } from '@angular/core';
import { SearchTermsForm, SearchTerms } from '../model/search-terms';
import { Scrapes } from '../model/scrapes';
import { ScraperService } from '../scraper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-search',
  templateUrl: './create-search.component.html',
  styleUrls: ['./create-search.component.css']
})
export class CreateSearchComponent implements OnInit {

  tagList = ['href', 'div'];
  model = new SearchTermsForm(null, null, null, null, null);
  dataSource: Scrapes;

  constructor(private scraperService: ScraperService) { }

  ngOnInit() {
  }

  onSubmit() {
    const searchTerms = new SearchTerms(
      null,
      this.model.searchName,
      this.model.domain,
      [this.model.tags],
      [this.model.keywords],
      [this.model.blockwords]
    );

    this.scraperService.saveSearch(searchTerms);
  }

}
