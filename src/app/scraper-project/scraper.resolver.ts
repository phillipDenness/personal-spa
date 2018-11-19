import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ScraperService } from './scraper.service';
import { HttpResponse } from '@angular/common/http';
import { SearchTerms } from './model/search-terms';

@Injectable()
export class ScraperResolver implements Resolve<any> {

  constructor(private scraperService: ScraperService) {}

  resolve(): Observable<HttpResponse<SearchTerms[]>> {
    return this.scraperService.getHttpSearchTerms();
  }
}
