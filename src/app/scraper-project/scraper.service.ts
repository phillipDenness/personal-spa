import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { SearchTerms } from './model/search-terms';
import { environment } from 'src/environments/environment';
import { Scrape } from './model/scrapes';

@Injectable()
export class ScraperService {

    scrapesSubject: BehaviorSubject<Scrape[]>;

    constructor(private httpClient: HttpClient) {
        this.scrapesSubject = new BehaviorSubject([]);
        this.getApiScrapes(3)
            .subscribe((response: any) => {
                this.scrapesSubject.next(response.body.scrapes);
            });
    }

    saveSearch(searchTerms: SearchTerms): any {
        this.postApiSearchTerms(searchTerms)
            .subscribe((response: any) => {
                this.scrapesSubject.next(response.body.scrapes);
            });
    }

    doScrape(searchTerms: SearchTerms) {
        this.getApiScrapes(searchTerms.searchTermsId).subscribe(response => {
            this.scrapesSubject.next(response.body.scrapes);
        });
    }

    postApiSearchTerms(searchTerms: SearchTerms): Observable<HttpResponse<any>> {
        return this.httpClient.post(environment.scraperApi.url, searchTerms, {observe: 'response'});
    }

    getApiScrapes(searchTermsId: number): Observable<HttpResponse<any>> {
        return this.httpClient.get(`${environment.scraperApi.url}/${searchTermsId}`, {observe: 'response'});
    }

    getHttpSearchTerms(): Observable<HttpResponse<SearchTerms[]>> {
        return this.httpClient.get<SearchTerms[]>(environment.scraperApi.url, {observe: 'response'});
    }
}
