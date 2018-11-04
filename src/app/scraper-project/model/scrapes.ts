import { SearchTerms } from './search-terms';

export interface IScrape {
    text: string;
    tag: string;
}

export class Scrape implements IScrape {
    constructor(
        public text: string,
        public tag: string
        ) {}
}

export interface IScrapes {
    searchTerms: SearchTerms;
    scrapes: Scrape[];
}

export class Scrapes implements IScrapes {
    constructor(
        public searchTerms: SearchTerms,
        public scrapes: Scrape[]
    ) {}
}
