import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FloorplanRequest, FloorplanResponse } from './model/floorplan-scanner';
import { environment } from 'src/environments/environment';

@Injectable()
export class FloorplanScannerService {

    private floorplanResponse: Subject<FloorplanResponse>;

    constructor(private httpClient: HttpClient) {
        this.floorplanResponse = new Subject();
    }

    getFloorplanResponseSubject(): Subject<any> {
        return this.floorplanResponse;
    }

    createFloorplan(url: string): any {
        this.postApiSearchTerms(new FloorplanRequest(url)).subscribe(response => {
            this.floorplanResponse.next(response.body);
        });
    }

    postApiSearchTerms(floorplanRequest: FloorplanRequest): Observable<HttpResponse<any>> {
        return this.httpClient.post(environment.floorplanApi.url, floorplanRequest, {observe: 'response'});
    }
}
