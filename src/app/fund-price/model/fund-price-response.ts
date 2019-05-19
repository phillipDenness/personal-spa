export interface IFundPriceResponse {
    fund: string;
    date: string;
    price: string;
    difference: string;
}

export class FundPriceResponse implements IFundPriceResponse {
    constructor(
        public fund: string,
        public date: string,
        public price: string,
        public difference: string
        ) {}
}
