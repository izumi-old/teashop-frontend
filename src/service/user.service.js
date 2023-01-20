
import {BACKEND_URL} from "../App";
import {AxiosResponse} from "axios";
import abstractService from "./abstract.service";
import SearchCondition from "../entity/SearchCondition";
import SearchFilter from "../entity/SearchFilter";

const ENTITY_NAME = "User";

class UserService {
    getByUsername(username): Promise<AxiosResponse> {
        let url = BACKEND_URL + "/rest/entities/" + ENTITY_NAME + '/search?fetchPlan=test';
        let conditions = [];
        conditions.push(new SearchCondition("username", "=", username));
        return abstractService.post(url, {
            filter: new SearchFilter(conditions)
        });
    }
}

export default new UserService();