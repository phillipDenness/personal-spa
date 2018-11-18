export interface IFloorplanRequest {
    url: string;
}

export class FloorplanRequest implements IFloorplanRequest {
    constructor(
        public url: string
    ) {}
}

export interface IFloorplanResponse {
    url: string;
    extractedText: string[];
    totalSquareArea: string;
}

export class FloorplanResponse implements IFloorplanResponse {
    constructor(
        public url: string,
        public extractedText: string[],
        public totalSquareArea: string
    ) {}
}
