class PaginationResponse {
    constructor(pageNumber, totalPages, content, totalElements, numberOfElements) {
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
        this.content = content;
        this.totalElements = totalElements;
        this.numberOfElements = numberOfElements;
    }

    static of(response: Response, offset, limit) {
        let totalCount = Number(response.headers["x-total-count"]);
        return new PaginationResponse(
            offset / limit + 1,
            PaginationResponse.getTotalPages(totalCount, limit),
            response.data,
            totalCount,
            limit
        );
    }

    static stub() {
        return new PaginationResponse(0, 0, [], 0, 0);
    }

    static getTotalPages(totalCount, limit): Number {
        return Math.ceil(totalCount / limit);
    }
}

export default PaginationResponse;