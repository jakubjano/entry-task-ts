export interface GetRequestParams {
    eventName: string;
    queryParams: QueryParams;
}

interface QueryParams {
    from: number;
    to: number;
    interval: number;
}
