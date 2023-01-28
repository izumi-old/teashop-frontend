import CommonProductCard from "./CommonProductCard";
import {Button} from "react-bootstrap";

class ChangeAmountCard extends CommonProductCard {
    renderTrigger() {
        return <Button>Изменить количество</Button>;
    }
}

export default ChangeAmountCard;
