import {Component} from "react";
import Bucket from "../bucket/Bucket";
import {Button} from "react-bootstrap";
import Item from "../bucket/Item";
import productService from "../service/product.service";
import { ToastContainer, toast } from 'react-toastify';
import ChangeAmountCard from "./popup/ChangeAmountCard";

import 'react-toastify/dist/ReactToastify.css';
import "../styles/components/BucketComponent.css";
import authService from "../service/auth.service";
import orderService from "../service/order.service";

class BucketComponent extends Component {
    constructor(props) {
        super(props);

        this.bucket = Bucket.get();
        this.products = [];

        this.uploadProducts().then(() => this.forceUpdate());
    }

    uploadProducts(): Promise {
        let productsIds = new Set();
        let items = this.bucket.items;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            productsIds.add(item.productId);
        }

        return productService.loadAllByIds(productsIds).then(response => {
            let products = response.data;
            for (let i = 0; i < products.length; i++) {
                let product = products[i];
                this.products.push(product);
            }
        })
    }

    totalPrice(): Number {
        let sum = 0;
        let items = this.bucket.items;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let product = this.getProduct(item);
            if (product === null) {
                continue;
            }

            sum += this.totalPriceOfItem(product, item);
        }

        return sum;
    }

    totalPriceOfItem(product, item): Number {
        return product.price * item.amount;
    }

    remove(item: Item) {
        this.bucket.removeItem(item);
        this.bucket.save();
        this.forceUpdate();
    }

    getProduct(item: Item) {
        for (let i = 0; i < this.products.length; i++) {
            let product = this.products[i];
            if (product.id === item.productId) {
                return product;
            }
        }

        return null;
    }

    drawUp() {
        let bucket: Bucket = this.bucket;
        orderService.create(bucket).then((response) => {
            bucket.removeAll();
            bucket.save();

            toast.success("Оформление прошло успешно!");
            this.bucket = Bucket.get();
            this.forceUpdate();
        });
    }

    render() {
        return <div>
            { !authService.isAuthenticated() && <h5>Для оформления нужно авторизоваться</h5> }
            { (authService.isAuthenticated() && this.bucket.isEmpty()) &&
                <h5>Для оформления корзина не должна быть пустой</h5> }
            <p>Общая стоимость - ₽{this.totalPrice()} </p>
            { (this.bucket.isEmpty() || !authService.isAuthenticated()) &&
                <Button variant={"dark"} disabled>Оформить</Button> }
            { (!this.bucket.isEmpty() && authService.isAuthenticated()) &&
                <Button variant={"primary"} onClick={() => this.drawUp()}>Оформить</Button> }
            <ToastContainer position={"bottom-right"} autoClose={"2000"}/>
            { this.renderItems() }
        </div>;
    }

    renderItems() {
        return <div className={"bucket-items-container"}>
            { this.bucket.items.map((item) => this.renderItem(item)) }
        </div>;
    }

    renderItem(item: Item) {
        let product = this.getProduct(item);
        return <div className={"bucket-item-container"}>
            <div> { product !== null && <img className={"product-image"} src={product.images[0].url} alt={product.name} /> } </div>
            <div className={"bucket-item-card"}>
                <h3>{product !== null ? product.name : item.productName}</h3>
                <p>Количество - {item.amount}</p>
                { product !== null && <p>Цена за единицу - ₽{product.price}</p> }
                { product !== null && <p>Итого - ₽{this.totalPriceOfItem(product, item)}</p> }
            </div>
            <div className={"bucket-item-buttons"}>
                { product !== null && <ChangeAmountCard product={product} afterChange={() => {
                    this.bucket = Bucket.get();
                    this.forceUpdate();
                }}/> }
                <Button onClick={() => this.remove(item)}>Убрать</Button>
            </div>
        </div>;
    }
}

export default BucketComponent;
