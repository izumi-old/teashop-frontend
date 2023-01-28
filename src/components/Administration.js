import {Component} from "react";
import userService from "../service/user.service";
import Objects from "../service/objects";
import {Button} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";

import "../styles/components/Administration.css";
import 'react-toastify/dist/ReactToastify.css';
import orderService from "../service/order.service";
import {Link} from "react-router-dom";
import Arrays from "../service/arrays";

class Administration extends Component {
    constructor(props) {
        super(props);

        this.uploadUsers();
        this.uploadOrders();
    }

    componentDidMount() {
        this.setState({
            showUsers: true,
            showOrders: false
        });
    }

    uploadUsers() {
        userService.getAll().then(response => {
           this.setState({
               users: response.data
           });
        });
    }

    uploadOrders() {
        orderService.getAll().then(response => {
            this.setState({
                orders: response.data
            });
        });
    }

    render() {
        return <div className={"administration-tab-sheet__container"}>
            <ToastContainer position={"bottom-right"} autoClose={"5000"}/>

            <div className={"administration-tab-sheet__container-buttons"}>
                <Button onClick={() => this.setState({
                    showUsers: true,
                    showOrders: false
                })}>Пользователи</Button>
                <Button onClick={() => this.setState({
                    showUsers: false,
                    showOrders: true
                })}>Заказы</Button>
            </div>

            { (Objects.isCorrect(this.state) && Objects.isCorrect(this.state.users) && this.state.showUsers) &&
                this.state.users.map((user) => this.renderUser(user)) }

            { (Objects.isCorrect(this.state) && Objects.isCorrect(this.state.orders) && this.state.showOrders) &&
                this.state.orders.map((order) => this.renderOrder(order)) }
        </div>
    }

    renderUser(user) {
        return <div className={"user-management__users-container"}>
            <div className={"user-management__users-info"}>
                <b>Логин: { user.username }</b>
                { Objects.isCorrect(user.firstName) && <p>Имя: { user.firstName } </p> }
                { Objects.isCorrect(user.lastName) && <p>Фамилия: { user.lastName } </p> }
                { Objects.isCorrect(user.email) && <p>E-mail: { user.email } </p> }
                { Objects.isCorrect(user.active) && <p>Активен: { user.active ? "Да" : "Нет" }</p> }
            </div>
            <div className={"user-management__users-buttons"}>
                <Button variant={"danger"} onClick={() => this.delete(user)}>
                    Удалить
                </Button>
            </div>
        </div>;
    }

    renderOrder(order) {
        return <div>
            <div className={"orders__order-container"}>
                <div className={"order-container__short-info"}>
                    <b>Заказ №{order.id}</b>
                    <p>Клиент: {order.user.firstName} {order.user.lastName} [{order.user.username}]</p>
                    <p>От {order.dateOfIssue} (год-месяц-день)</p>
                    <p>В статусе: {orderService.getStatus(order)}</p>
                    <span>Общая стоимость - ₽{orderService.countCost(order)}</span>
                </div>
                <div className={"order-container__buttons"}>
                    <Button variant={"danger"} onClick={() => this.cancel(order)}>Отменить</Button>
                </div>
            </div>
        </div>;
    }

    delete(user) {
        userService.delete(user.username).then(response => {
            let users = this.state.users;
            Arrays.remove(users, user);
            toast.success("Пользователь удален");
            this.setState({
                users: users
            });
        });
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
}

export default Administration;
