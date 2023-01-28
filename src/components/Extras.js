import PaginationResponse from "../entity/PaginationResponse";
import productService from "../service/product.service";
import collectionService from "../service/collection.service";
import CommonProduct from "./CommonProduct";

class Extras extends CommonProduct {
    componentDidMount() {
        super.componentDidMount();

        collectionService.getExtra().then(response => {
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
            return productService.getStuff(page, size);
        } else {
            if (this.minPrice === undefined) {
                return productService.getStuffCollection(page, size, this.selectedCollection.name);
            } else {
                return productService.getStuffCollectionPrice(
                    page, size, this.selectedCollection.name, this.minPrice, this.maxPrice
                );
            }
        }
    }

    minPricePromise(): Promise {
        return productService.getStuffMinPrice().then(response => {
            return response.data
        })
    }

    maxPricePromise(): Promise {
        return productService.getStuffMaxPrice().then(response => {
            return response.data
        })
    }
}

export default Extras;
