import axios from 'axios';
import authHeader from './headers';
import {BACKEND_URL} from "../App";
import authService from "./auth.service";
import logger from "../utils/Logger";
import PaginationResponse from "../entity/PaginationResponse";

class AbstractService {
    getAll(entityName) {
        return this.formGetRequest(BACKEND_URL + "/rest/entities/" + entityName)
            .then(response => {
                return response.data;
            });
    }

    getById(entityName, id) {
        return this.formGetRequest(BACKEND_URL + "/rest/entities/" + entityName + "/" + id)
            .then(response => {
                return response.data;
            });
    }

    getAllPaginate(entityName, page, pageSize): Promise<PaginationResponse> {
        let offset = page * pageSize;
        let limit = pageSize;

        let url = BACKEND_URL + "/rest/entities/" + entityName +
            "?offset=" + offset +
            "&limit=" + limit +
            "&returnCount=true";

        return this.formGetRequest(url)
            .then(response => {
                return PaginationResponse.of(response, offset, limit);
            });
    }

    getAllPaginateFetchPlan(entityName, page, pageSize, fetchPlan): Promise<PaginationResponse> {
        let offset = page * pageSize;
        let limit = pageSize;

        let url = BACKEND_URL + "/rest/entities/" + entityName +
            "?offset=" + offset +
            "&limit=" + limit +
            "&returnCount=true" +
            "&fetchPlan=" + fetchPlan;

        return this.formGetRequest(url)
            .then(response => {
                return PaginationResponse.of(response, offset, limit);
            });
    }

    formGetRequest(url): Promise {
        if (authService.isAuthenticated()) {
            logger.debug("(Authenticated request) " + url);
            return this.getAuthenticated(url);
        } else {
            logger.debug("(Anonymous request) " + url);
            return this.getAnonymous(url);
        }
    }

    getAnonymous(url): Promise {
        return axios.get(url);
    }

    getAuthenticated(url): Promise {
        return axios.get(url, { headers: authHeader() })
    }
}

export default new AbstractService()