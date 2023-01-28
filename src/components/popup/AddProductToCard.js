import {Button} from "react-bootstrap";
import CommonProductCard from "./CommonProductCard";

class AddProductToCard extends CommonProductCard {
    renderTrigger() {
        return <Button variant={"dark"}>Добавить в корзину</Button>;
    }
}

export default AddProductToCard;
