
export interface IFund {
    name: string;
    fundLink: string;
}

export class Fund implements IFund {
    constructor(
        public name: string,
        public fundLink: string
        ) {}
}
