import { Component, OnInit } from '@angular/core';
import { SearchTerms, SearchTermsForm } from './model/search-terms';
import { Scrapes, Scrape } from './model/scrapes';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scraper-project',
  templateUrl: './scraper-project.component.html',
  styleUrls: ['./scraper-project.component.css'],
})
export class ScraperProjectComponent implements OnInit {
  tagList = ['href', 'div'];
  model = new SearchTermsForm(null, null, null, null, null);
  dataSource: Scrapes;

  constructor(private httpClient: HttpClient) {
    this.dataSource = new Scrapes(null, []);
  }

  ngOnInit() {
    this.httpClient.get(environment.scraperApi.url + '/1')
      .subscribe((response: any) => {
        this.dataSource = response;
      });
  }

  onSubmit() {
    console.log(this.model);
    const searchTerms = new SearchTerms(
      null,
      this.model.searchName,
      this.model.domain,
      [this.model.tags],
      [this.model.keywords],
      [this.model.blockwords]
    );
    this.httpClient.post(environment.scraperApi.url, searchTerms)
      .subscribe((response: any) => {
        console.log(response);
        this.dataSource = response;
      });
  }
}
