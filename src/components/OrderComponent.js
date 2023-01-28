import {useLocation, useNavigate} from "react-router-dom";
import orderService from "../service/order.service";

import {Button} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";

import "../styles/components/OrderComponent.css";
import 'react-toastify/dist/ReactToastify.css';

const OrderComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state;

    return (
        <div>
            <ToastContainer position={"bottom-right"} autoClose={"5000"}/>
            <div className={"order-details__buttons-panel"}>
                <Button onClick={() => navigate("/profile")}>Перейти в профиль</Button>
                <Button variant={"danger"} onClick={() => cancel(order, navigate)}>Отменить заказ</Button>
            </div>
            <div className={"order-container__short-info order-details"}>
                <b>Заказ №{order.id}</b>
                <p>От {order.dateOfIssue} (год-месяц-день)</p>
                <p>В статусе: {orderService.getStatus(order)}</p>
            </div>
            <div><b>Полная стоимость - ₽{orderService.countCost(order)}</b></div>
            <div className={"order-items__container"}>
                { order.items.map((item) => renderItem(item)) }
            </div>
        </div>
    );
}

function renderItem(item) {
    return <div className={"order-item__container"}>
        <div className={"order-item__short-info"}>
            <p>Наименование - <b>{ item.product.name }</b></p>
            <p>Цена за штуку - ₽{ item.price }</p>
            <p>Количество - { item.amount }</p>
            <p>Общая цена - ₽{ item.price * item.amount } </p>
        </div>
        <div>
            <img className={"product-image"} src={item.product.images[0].url} alt={item.product.name}/>
        </div>
    </div>;
}

function cancel(order, navigate) {
    orderService.cancel(order).then(() => {
        toast.success("Заказ успешно отменен");
        navigate("/profile")
    });
}

export default OrderComponent;
