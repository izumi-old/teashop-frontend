import abstractService from "./abstract.service";
import PaginationResponse from "../entity/PaginationResponse";

const ENTITY_NAME = "Product";

class ProductService {
    getPaginated(page, size): Promise<PaginationResponse> {
        return abstractService.getAllPaginate(ENTITY_NAME, page, size);
    }
}

export default new ProductService();
