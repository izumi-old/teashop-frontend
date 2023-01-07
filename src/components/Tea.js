import productService from "../service/product.service";
import AiPagination from "./paginated/AiPagination";
import PaginationResponse from "../entity/PaginationResponse";
import ProductCard from "./cards/ProductCard";

import "../styles/components/Tea.css";
import {subarray} from "../service/utils";

class Tea extends AiPagination {
    constructor(props) {
        super(props);

        this.getTilesPerRow = this.getTilesPerRow.bind(this);
        this.renderTiles = this.renderTiles.bind(this);
        this.renderProduct = this.renderProduct.bind(this);
    }

    gettingFunction(page, size): Promise<PaginationResponse> {
        if (page === undefined || size === undefined) {
            return new Promise(() => {
                return PaginationResponse.stub()
            })
        }

        return productService.getPaginated(page, size);
    }

    getItemsPageSize(): Number {
        return 6;
    }

    getTilesPerRow(): Number {
        return 3;
    }

    renderTiles() {
        return <div className={"products-tiles"}>
            { this.state.items.map((item) => this.renderProduct(item)) }
        </div>
        /*const tilesPerRow = this.getTilesPerRow()
        const items: Array = this.state.items
        let rows = [];

        let rowsNumber = Math.ceil(items.length / tilesPerRow);
        for (let rowNumber = 0 ; rowNumber < rowsNumber; rowNumber++) {
            let copyFrom = rowNumber * tilesPerRow;
            let products = subarray(items, copyFrom, copyFrom + tilesPerRow);
            let row = (<div className={"products-row"}>
                { products.map((product) => this.renderProduct(product)) }
            </div>);
            rows.push(row);
        }

        return <div className={"products-tiles"}>
            { rows }
        </div>*/
    }

    renderProduct(product) {
        if (product === undefined) {
            return <div/>
        }
        return (<ProductCard key={product.id} product={product}/>);
    }

    render() {
        return <div id={"tea-body"}>
            <div id={"tea-filter"}>
            </div>
            <div id={"tea-place"}>
                { this.renderControl() }
                { this.renderTiles() }
            </div>
        </div>
    }
}

export default Tea;
