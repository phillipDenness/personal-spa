
export interface ISearchTerms {
    searchTermsId: number;
    searchName: string;
    domain: string;
    tags: string[];
    keywords: string[];
    blockwords: string[];
}

export class SearchTerms implements ISearchTerms {
    constructor(
        public searchTermsId: number,
        public searchName: string,
        public domain: string,
        public tags: string[],
        public keywords: string[],
        public blockwords: string[],
        ) {}
}

export class SearchTermsForm {
    constructor(
        public searchName: string,
        public domain: string,
        public tags: string,
        public keywords: string,
        public blockwords: string,
        ) {}
}
