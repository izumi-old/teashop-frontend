import axios from 'axios';
import authHeader from './headers';
import {BACKEND_URL} from "../App";
import authService from "./auth.service";
import logger from "../utils/Logger";
import PaginationResponse from "../entity/PaginationResponse";
import {AxiosResponse} from "axios";

class AbstractService {
    post(url, data): Promise<AxiosResponse> {
        if (authService.isAuthenticated()) {
            return this.postAuthenticated(url, data);
        } else {
            return this.postAnonymous(url, data);
        }
    }

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
            return this.getAuthenticated(url);
        } else {
            return this.getAnonymous(url);
        }
    }

    getAnonymous(url): Promise {
        logger.debug("(Anonymous request) " + url);
        return axios.get(url);
    }

    getAuthenticated(url): Promise {
        logger.debug("(Authenticated request) " + url);
        return axios.get(url, { headers: authHeader() })
    }

    postAnonymous(url, data): Promise<AxiosResponse> {
        return axios.post(url, data);
    }

    postAuthenticated(url, data): Promise<AxiosResponse> {
        return axios.post(url, data, { headers: authHeader() });
    }
}

export default new AbstractService()