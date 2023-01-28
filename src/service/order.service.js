import abstractService from "./abstract.service";
import {BACKEND_URL} from "../App";
import authService from "./auth.service";
import {AxiosResponse} from "axios";

class OrderService {
    create(bucket): Promise<AxiosResponse> {
        return abstractService.postAnonymous(
            BACKEND_URL + "/orders/create",
            { user: authService.getCurrentUser(), bucket: bucket }
        )
    }

    getAll(): Promise<AxiosResponse> {
        return abstractService.getAnonymous(BACKEND_URL + "/orders?username=" + authService.getCurrentUser().username);
    }

    cancel(order): Promise<AxiosResponse> {
        return abstractService.getAnonymous(BACKEND_URL + "/orders/cancel?id=" + order.id);
    }

    getStatus(order) {
        let status = String(order.status);
        if (status === "GOING") {
            return "Собирается";
        } else if (status === "FOR_DELIVERY") {
            return "Передан в доставку";
        } else if (status === "FOR_RECEIPT") {
            return "Готов к получению";
        } else if (status === "RECEIVED") {
            return "Получен";
        } else {
            return "Неизвестен";
        }
    }

    countCost(order): Number {
        let sum = 0;
        for (let i = 0; i < order.items.length; i++) {
            let item = order.items[i];
            sum += (item.price * item.amount);
        }

        return sum;
    }
}

export default new OrderService();