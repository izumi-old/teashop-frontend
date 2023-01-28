import {Component} from "react";
import authService from "../service/auth.service";
import orderService from "../service/order.service";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import Arrays from "../service/arrays";
import {toast, ToastContainer} from "react-toastify";

import "../styles/components/Profile.css";
import 'react-toastify/dist/ReactToastify.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.uploadOrders();
    }

    uploadOrders(): Promise {
        return orderService.getAllByUsername().then(response => {
            this.setState({
                orders: response.data
            });
        })
    }

    cancel(order) {
        orderService.cancel(order).then(() => {
            let orders = this.state.orders;
            Arrays.remove(orders, order);
            toast.success("Заказ успешно отменен");
            this.setState({
                orders: orders
            });
        });
    }

    render() {
        let user = authService.getCurrentUser()

        return <div>
            <div id={"profile-container"}>
                <div id={"profile-names"}>
                    <span>Логин:</span>
                    <span>E-mail:</span>
                    <span>Имя:</span>
                    <span>Фамилия:</span>
                </div>
                <div id={"profile-values"}>
                    <span>{user.username}</span>
                    <span>{user.email}</span>
                    <span>{user.firstName}</span>
                    <span>{user.lastName}</span>
                </div>
            </div>

            <ToastContainer position={"bottom-right"} autoClose={"5000"}/>

            { this.renderOrders() }
        </div>;
    }

    renderOrders() {
        return <div>
            <h2>Заказы:</h2>

            { this.state !== null && this.state.orders.map((order) => this.renderOrder(order)) }
        </div>;
    }

    renderOrder(order) {
        return <div>
            <div className={"orders__order-container"}>
                <div className={"order-container__short-info"}>
                    <b>Заказ №{order.id}</b>
                    <p>От {order.dateOfIssue} (год-месяц-день)</p>
                    <p>В статусе: {orderService.getStatus(order)}</p>
                    <span>Общая стоимость - ₽{orderService.countCost(order)}</span>
                </div>
                <div className={"order-container__buttons"}>
                    <Link to={"/order"} state={order} className={"btn btn-info"}>
                        Детали
                    </Link>

                    <Button variant={"danger"} onClick={() => this.cancel(order)}>Отменить</Button>
                </div>
            </div>
        </div>;
    }
}

export default Profile;
