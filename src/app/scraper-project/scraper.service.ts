import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { SearchTerms } from './model/search-terms';
import { environment } from 'src/environments/environment';
import { Scrape } from './model/scrapes';

@Injectable()
export class ScraperService {

    private scrapesSubject: BehaviorSubject<Scrape[]>;
    private apiInformationSubject: Subject<string>;
    private searchInfoSubject: BehaviorSubject<SearchTerms>;

    constructor(private httpClient: HttpClient) {
        const defaultSearch = new SearchTerms(3, 'AWS HTTPS',
        'https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/https-singleinstance-java.html', ['div'], ['nginx'], []);

        this.apiInformationSubject = new Subject();
        this.searchInfoSubject = new BehaviorSubject(defaultSearch);
        this.scrapesSubject = new BehaviorSubject([]);

        this.getApiScrapes(defaultSearch.searchTermsId)
            .subscribe((response: any) => {
                this.scrapesSubject.next(response.body.scrapes);
            });
    }

    getSearchInfoSubject(): Subject<SearchTerms> {
        return this.searchInfoSubject;
    }

    getScrapeSubject(): BehaviorSubject<Scrape[]> {
        return this.scrapesSubject;
    }

    setApiInformationSubject(apiUpdate: string) {
        this.apiInformationSubject.next(apiUpdate);
    }

    getApiInformationSubject(): Subject<string> {
        return this.apiInformationSubject;
    }

    saveSearch(searchTerms: SearchTerms): any {
        this.setApiInformationSubject('Waiting for response from API');

        this.postApiSearchTerms(searchTerms)
            .subscribe((response: any) => {
                this.scrapesSubject.next(response.body.scrapes);
            });
    }

    doScrape(searchTerms: SearchTerms) {
        this.searchInfoSubject.next(searchTerms);
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
