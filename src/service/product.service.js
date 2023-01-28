import abstractService from "./abstract.service";
import PaginationResponse from "../entity/PaginationResponse";
import {BACKEND_URL} from "../App";
import {AxiosResponse} from "axios";
import Product from "../entity/Product";
import authService from "./auth.service";

const ENTITY_NAME = "Product";

class ProductService {
    getPaginated(page, size): Promise<PaginationResponse> {
        return abstractService.getAllPaginate(ENTITY_NAME, page, size);
    }

    getTea(page, size): Promise<PaginationResponse> {
        let offset = page * size;

        return abstractService.getAnonymous(BACKEND_URL + "/products/tea?offset=" + offset + "&limit=" + size)
            .then(response => {
                let total = response.data.total;
                return new PaginationResponse(
                    page + 1,
                    PaginationResponse.getTotalPages(total, size),
                    response.data.content,
                    total,
                    size
                );
            });
    }

    getTeaCollection(page, size, collection): Promise<PaginationResponse> {
        let offset = page * size;

        return abstractService.getAnonymous(BACKEND_URL + "/products/tea?offset=" + offset +
            "&limit=" + size +
            "&collection=" + collection)
            .then(response => {
                let total = response.data.total;
                return new PaginationResponse(
                    page + 1,
                    PaginationResponse.getTotalPages(total, size),
                    response.data.content,
                    total,
                    size
                );
            });
    }

    getTeaCollectionPrice(page, size, collection, minPrice, maxPrice): Promise<PaginationResponse> {
        let offset = page * size;

        return abstractService.getAnonymous(BACKEND_URL + "/products/tea?offset=" + offset +
            "&limit=" + size +
            "&collection=" + collection +
            "&minPrice=" + minPrice +
            "&maxPrice=" + maxPrice)
            .then(response => {
                let total = response.data.total;
                return new PaginationResponse(
                    page + 1,
                    PaginationResponse.getTotalPages(total, size),
                    response.data.content,
                    total,
                    size
                );
            });
    }

    getStuff(page, size): Promise<PaginationResponse> {
        let offset = page * size;

        return abstractService.getAnonymous(BACKEND_URL + "/products/stuff?offset=" + offset + "&limit=" + size)
            .then(response => {
                let total = response.data.total;
                return new PaginationResponse(
                    page + 1,
                    PaginationResponse.getTotalPages(total, size),
                    response.data.content,
                    total,
                    size
                );
            });
    }

    getStuffCollection(page, size, collection): Promise<PaginationResponse> {
        let offset = page * size;

        return abstractService.getAnonymous(BACKEND_URL + "/products/stuff?offset=" + offset +
            "&limit=" + size +
            "&collection=" + collection)
            .then(response => {
                let total = response.data.total;
                return new PaginationResponse(
                    page + 1,
                    PaginationResponse.getTotalPages(total, size),
                    response.data.content,
                    total,
                    size
                );
            });
    }

    getStuffCollectionPrice(page, size, collection, minPrice, maxPrice): Promise<PaginationResponse> {
        let offset = page * size;

        return abstractService.getAnonymous(BACKEND_URL + "/products/stuff?offset=" + offset +
            "&limit=" + size +
            "&collection=" + collection +
            "&minPrice=" + minPrice +
            "&maxPrice=" + maxPrice)
            .then(response => {
                let total = response.data.total;
                return new PaginationResponse(
                    page + 1,
                    PaginationResponse.getTotalPages(total, size),
                    response.data.content,
                    total,
                    size
                );
            });
    }

    getTeaMinPrice(): Promise<AxiosResponse> {
        return abstractService.getAnonymous(BACKEND_URL + "/products/tea/minPrice");
    }

    getTeaMaxPrice(): Promise<AxiosResponse> {
        return abstractService.getAnonymous(BACKEND_URL + "/products/tea/maxPrice");
    }

    getStuffMinPrice(): Promise<AxiosResponse> {
        return abstractService.getAnonymous(BACKEND_URL + "/products/stuff/minPrice");
    }

    getStuffMaxPrice(): Promise<AxiosResponse> {
        return abstractService.getAnonymous(BACKEND_URL + "/products/stuff/maxPrice");
    }

    getBaseMaxAmount(product: Product) {
        if (!authService.isAuthenticated()) {
            let percents = Math.ceil(Number(product.remainder * 0.2));
            if (percents === 0) {
                return 1;
            }

            return percents;
        } else if (product.remainder === 1) {
            return 1;
        } else {
            return Math.ceil(Number(product.remainder * 0.5)) + 1;
        }
    }

    loadAllByIds(ids: Set) {
        return abstractService.postAnonymous(BACKEND_URL + "/products/ids", { ids: Array.from(ids) });
    }
}

export default new ProductService();
