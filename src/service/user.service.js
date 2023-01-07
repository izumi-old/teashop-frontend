
import axios from 'axios';
import authHeader from './headers';
import {BACKEND_URL} from "../App";

const ENTITY_NAME = "User";

class UserService {
    getByUsername(username) {
        return axios.get(
            BACKEND_URL + "/rest/entities/" + ENTITY_NAME + '/search?filter=' +
            '{"conditions":[{"property": "username", "operator": "equals", "value": "' + username + '"}]}',
            {headers: authHeader()}
        )
        .then(response => {
            return response.data;
        });
    }
}

export default new UserService();