import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { FundPriceResponse } from "./model/fund-price-response";

@Injectable()
export class FundPriceService {

    constructor(private httpClient: HttpClient) {
    }

    getPrice(fundLink: string): Observable<HttpResponse<FundPriceResponse>> {
        return this.httpClient.get<FundPriceResponse>(`${environment.fundPriceApi.url}/historic/today?url=${fundLink}`,
            {observe: 'response'});
    }
}