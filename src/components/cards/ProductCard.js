import {Card} from "react-bootstrap";
import {Component} from "react";
import "../../styles/components/cards/ProductCard.css";

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
                    <Card.Img className={"product-image"} src={product.images[0].url} alt={product.name}/>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>₽{product.price}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default ProductCard;