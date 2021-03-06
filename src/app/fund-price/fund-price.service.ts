import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FundPriceResponse } from './model/fund-price-response';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class FundPriceService {

    s3Response = this.socket.fromEvent<string>('s3Response');

    constructor(private httpClient: HttpClient, private socket: Socket) {}

    getHistoricPrice(fromDate: NgbDate, toDate: NgbDate, symbol: String): Observable<HttpResponse<string>> {

        const url = `${environment.fundPriceApi.url}/historic/api?` +
            `from=${fromDate.day}-${fromDate.month}-${fromDate.year}` +
            `&to=${toDate.day}-${toDate.month}-${toDate.year}` +
            `&symbol=${symbol}` +
            `&callback=${environment.nodeserver.url}/api/fund-price`;
        console.log(url);

        return this.httpClient.get<string>(url,{observe: 'response'});
    }

    getPrice(fundLink: string): Observable<HttpResponse<FundPriceResponse>> {
        return this.httpClient.get<FundPriceResponse>(`${environment.fundPriceApi.url}/historic/today?url=${fundLink}`,
            {observe: 'response'});
    }

}