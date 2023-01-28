
import {BACKEND_URL} from "../App";
import {AxiosResponse} from "axios";
import abstractService from "./abstract.service";

class UserService {
    save(username, password): Promise<AxiosResponse> {
        let url = BACKEND_URL + "/rest/entities/u";
        return abstractService.postAnonymous(url, { username: username, password: password })
    }

    getAll(): Promise<AxiosResponse> {
        return abstractService.getAnonymous(BACKEND_URL + "/rest/entities/u");
    }

    delete(username): Promise<AxiosResponse> {
        return abstractService.getAnonymous(BACKEND_URL + "/rest/entities/u/delete?username=" + username);
    }
}

export default new UserService();