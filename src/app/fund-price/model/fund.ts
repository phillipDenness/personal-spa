
export interface IFund {
    name: string;
    fundLink: string;
    symbol: string;
}

export class Fund implements IFund {
    constructor(
        public name: string,
        public fundLink: string,
        public symbol: string
        ) {}
}
