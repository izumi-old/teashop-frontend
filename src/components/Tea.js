import productService from "../service/product.service";
import PaginationResponse from "../entity/PaginationResponse";

import collectionService from "../service/collection.service";
import CommonProduct from "./CommonProduct";

class Tea extends CommonProduct {
    componentDidMount() {
        super.componentDidMount();

        collectionService.getTea().then(response => {
            this.setState({
                collections: response.data
            })

            if (this.collectionToButton.has("Все")) {
                this.collectionToButton.get("Все").click();
            }
        });
    }

    gettingFunction(page, size): Promise<PaginationResponse> {
        if (page === undefined || size === undefined) {
            return new Promise(() => {
                return PaginationResponse.stub()
            })
        }

        if (this.selectedCollection === undefined) {
            return productService.getTea(page, size);
        } else {
            if (this.minPrice === undefined) {
                return productService.getTeaCollection(page, size, this.selectedCollection.name);
            } else {
                return productService.getTeaCollectionPrice(
                    page, size, this.selectedCollection.name, this.minPrice, this.maxPrice
                );
            }
        }
    }

    minPricePromise(): Promise {
        return productService.getTeaMinPrice().then(response => {
            return response.data
        })
    }

    maxPricePromise(): Promise {
        return productService.getTeaMaxPrice().then(response => {
            return response.data
        })
    }
}

export default Tea;
