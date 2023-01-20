import axios from "axios";
import {API_PASSWORD, API_USERNAME, OAUTH_URL} from "../App";
import userService from "./user.service";
import logger from "../utils/Logger";

class AuthService {
    updateTokenIfExpired(username, password): Promise {
        if (!this.isTokenExpired()) {
            return new Promise(() => {
                return 1;
            });
        }

        let url = OAUTH_URL + "?grant_type=password&username=" + username + "&password=" + password
        logger.debug("Going to authorize. The url: " + url)
        return axios.post(url, "", {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            auth: {
                username: API_USERNAME,
                password: API_PASSWORD
            }
        })
        .then(response => {
            let expiresAt = new Date().getTime() + Number(response.data["expires_in"])
            localStorage.setItem("token", response.data["access_token"]);
            localStorage.setItem("expiresAt", expiresAt)
            localStorage.setItem("username", username)
            localStorage.setItem("password", password)
        })
    }

    login(username, password): Promise {
        return this.updateTokenIfExpired(username, password)
            .then(() => {
                return userService.getByUsername(username).then(response => {
                    localStorage.setItem("currentUser", JSON.stringify(response.data[0]))
                });
            });
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiresAt");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }

    isTokenExpired(): Boolean {
        let expiresAt = localStorage.getItem("expiresAt");
        if (expiresAt === undefined || expiresAt === null) {
            return true;
        }

        return new Date().getTime() > Number(expiresAt)
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("currentUser"));
    }

    isAuthenticated(): Boolean {
        let username = localStorage.getItem("username");
        if (username === undefined || username === null) {
            return false;
        }

        return !this.isTokenExpired();
    }
}

export default new AuthService();