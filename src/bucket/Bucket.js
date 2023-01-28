import extLocalStorage from "../service/ext.local.storage";
import Objects from "../service/objects";
import Item from "./Item";
import Product from "../entity/Product";
import EventHub from "../service/event.hub";
import Arrays from "../service/arrays";

const hub = new EventHub();
class Bucket {
    constructor(items: Array) {
        if (Objects.isCorrect(items)) {
            this.items = items;
        } else {
            this.items = [];
        }
    }

    static get(): Bucket {
        let object = extLocalStorage.getParsedJson("bucket")
        let items = []
        for (let i = 0; i < object.items.length; i++) {
            let item = object.items[i];
            items.push(new Item(item.productId, item.productName, item.amount));
        }

        return new Bucket(items);
    }

    static exists(): Boolean {
        return Objects.isCorrect(localStorage.getItem("bucket"))
    }

    static create() {
        new Bucket().save();
    }

    static onChange(listener) {
        hub.subscribe("bucket-onChange", listener);
    }

    addItem(item: Item) {
        this.items.push(item);
    }

    removeItem(item: Item) {
        Arrays.remove(this.items, item);
    }

    removeAll() {
        Arrays.clear(this.items);
    }

    save() {
        extLocalStorage.setAsJson("bucket", this);
        hub.fire("bucket-onChange");
    }

    containsProduct(product: Product): Boolean {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.productId === product.id) {
                return true;
            }
        }

        return false;
    }

    getItemByProduct(product: Product): Item {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.productId === product.id) {
                return item;
            }
        }

        throw new Error("No item with given product is present");
    }

    isEmpty(): Boolean {
        return this.items.length === 0;
    }
}

export default Bucket;