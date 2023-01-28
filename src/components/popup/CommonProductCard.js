import {Component} from "react";
import {Button, Form, Image} from "react-bootstrap";
import Popup from "reactjs-popup";

import "../../styles/components/popup/CommonProductCard.css";
import Bucket from "../../bucket/Bucket";
import Item from "../../bucket/Item";
import productService from "../../service/product.service";
import Objects from "../../service/objects";

class CommonProductCard extends Component {
    constructor(props) {
        super(props);

        this.afterChange = props.afterChange;

        this.state = {
            product: props.product,
            number: 1
        }
    }

    total(): Number {
        if (this.state.count === true) {
            return this.state.number * this.state.product.price;
        }

        return this.defaultAmount(this.state.product) * this.state.product.price;
    }

    buy(e, close) {
        let product = this.state.product
        let bucket = Bucket.get();
        if (bucket.containsProduct(product)) {
            let item = bucket.getItemByProduct(product);
            if (String(this.state.number) === "0") {
                bucket.removeItem(item);
            } else {
                item.amount = this.state.number;
            }
        } else {
            let item = new Item(product.id, product.name, this.state.number);
            bucket.addItem(item);
        }

        bucket.save();

        if (Objects.isCorrect(this.afterChange)) {
            this.afterChange();
        }

        close();
    }

    inBucket(product): Number {
        if (this.state.count === true) {
            return this.state.number;
        }

        return this.defaultAmount(product);
    }

    totalAvailable(product): Number {
        return productService.getBaseMaxAmount(product);
    }

    minAmount(product): Number {
        return 0;
    }

    defaultAmount(product): Number {
        let bucket = Bucket.get();
        if (!bucket.containsProduct(product)) {
            return 1;
        }

        return bucket.getItemByProduct(product).amount;
    }

    renderTrigger() {
        return <Button>Trigger</Button>;
    }

    render() {
        let product = this.state.product;
        return <Popup className={"cart-popup"} trigger={() => this.renderTrigger()} modal nested>
            { close => (
                <div id={"cart-popup-body"}>
                    <Image className={"cart-image"} src={product.images[0].url} alt={product.name}/>

                    <div id={"cart-popup-info"}>
                        <p>{product.name}</p>
                        <p>₽{product.price}</p>

                        <Form onSubmit={(e) => this.buy(e, close)}>
                            <Form.Label>В корзине - {this.inBucket(product)}</Form.Label>
                            <br/>
                            <Form.Label>Доступно всего - {this.totalAvailable(product)}</Form.Label>
                            <br/>
                            <Form.Control type={"number"}
                                          min={this.minAmount(product)}
                                          max={this.totalAvailable(product)}
                                          defaultValue={this.defaultAmount(product)}
                                          onChange={(e) => {
                                              this.setState({
                                                  number: e.target.value,
                                                  count: true
                                              });
                                          }}/>
                            <Form.Label className={"total-count"}>Итого: ₽{ this.total() }</Form.Label>
                            <br/>
                            <button className={"btn btn-dark btn-group confirm-button"}>
                                Подтвердить
                            </button>
                        </Form>
                        <button id={"product-card-close-btn"}
                                className={"aaa btn btn-dark btn-group confirm-button"}
                                onClick={close}>
                            Закрыть
                        </button>
                    </div>
                </div>
            )}

        </Popup>;
    }
}

export default CommonProductCard;