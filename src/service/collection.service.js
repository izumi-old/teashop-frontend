import abstractService from "./abstract.service";
import {BACKEND_URL} from "../App";
import {AxiosResponse} from "axios";

class CollectionService {
    getTea(): Promise<AxiosResponse> {
        return abstractService.getAnonymous(BACKEND_URL + "/collections/tea");
    }

    getExtra(): Promise<AxiosResponse> {
        return abstractService.getAnonymous(BACKEND_URL + "/collections/extra");
    }
}

export default new CollectionService();