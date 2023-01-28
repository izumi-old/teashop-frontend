import {Button, Card} from "react-bootstrap";
import {Component} from "react";
import "../../styles/components/cards/ProductCard.css";
import AddProductToCard from "../popup/AddProductToCard";

class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: props.product
        }
    }

    render() {
        const product = this.state.product;
        return (
            <Card className={"product-card"}>
                <Card.Body>
                    <div className={"product-image-container"}>
                        <Card.Img className={"product-image"} src={product.images[0].url} alt={product.name} />
                    </div>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>₽{product.price}</Card.Text>

                    { (product.remainder !== 0) && <AddProductToCard product={product}/> }
                    { product.remainder === 0 && <Button variant={"dark"} disabled>Нет в наличии</Button> }
                </Card.Body>
            </Card>
        );
    }
}

export default ProductCard;