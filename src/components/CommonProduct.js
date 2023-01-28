import ProductCard from "./cards/ProductCard";
import logger from "../utils/Logger";
import RangeSlider from "./RangeSlider";
import AiPagination from "./paginated/AiPagination";

import "../styles/components/CommonProduct.css";

class CommonProduct extends AiPagination {
    constructor(props) {
        super(props);

        this.getTilesPerRow = this.getTilesPerRow.bind(this);
        this.renderTiles = this.renderTiles.bind(this);
        this.renderProduct = this.renderProduct.bind(this);

        this.collectionToButton = new Map();
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
    }

    renderProduct(product) {
        if (product === undefined) {
            return <div/>
        }
        return (<ProductCard key={product.id} product={product}/>);
    }

    renderCollections() {
        let collections = this.state.collections !== undefined ? this.state.collections : [];
        return <div id={"collection-container"}>
            { collections.map((collection) => this.renderCollection(collection)) }
        </div>
    }

    renderCollection(collection) {
        return <button className={"btn collection-item"}
                       onClick={(event) => this.selectCollection(event, collection)}
                       ref={(ref) => this.collectionToButton.set(collection.name, ref)}>
            {collection.name}
        </button>;
    }

    selectCollection(event, collection) {
        if (this.selectedCollection !== undefined && this.selectedCollection.name === collection.name) {
            return;
        }

        event.target.style.color = "#38238c"
        if (this.selectedCollectionButton !== undefined) {
            this.selectedCollectionButton.style.color = "black"
        }

        logger.debug("Selected " + collection.name + " collection")
        this.selectedCollectionButton = event.target;
        this.selectedCollection = collection;
        this.changePage(1);
    }

    minPricePromise(): Promise {
        return new Promise(0);
    }

    maxPricePromise(): Promise {
        return new Promise(100);
    }

    render() {
        return <div id={"product-body"}>
            <div id={"product-filter"}>
                <h3>Фильтр</h3>

                <br/><br/>

                <h4>Коллекция</h4>
                <div id={"filter-collection"}>
                    { this.renderCollections() }
                </div>

                <br/><br/>

                <h4>Цена</h4>
                <div id={"filter-price"}>
                    <RangeSlider sliderRef={(ref) => this.priceSlider = ref}
                                 minPromise={this.minPricePromise}
                                 maxPromise={this.maxPricePromise}
                                 selectionCallback={(min, max) => {
                                     this.minPrice = min;
                                     this.maxPrice = max;
                                     this.changePage(1);
                                 }}/>
                </div>
            </div>
            <div id={"product-place"}>
                { this.renderControl() }
                { this.renderTiles() }
            </div>
        </div>
    }
}

export default CommonProduct;