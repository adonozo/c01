export class QueryParams {
    public filter: string;
    public page: number;
    public pageSize: number;

    public constructor(filter: string, page: number, pageSize: number) {
        this.filter = filter;
        this.page = page;
        this.pageSize = pageSize
    }

    public static get defaultParams(): QueryParams {
        return {
            filter: '',
            page: 0,
            pageSize: 10
        }
    }
}
