import axios from "axios";
import {API_PASSWORD, API_USERNAME, OAUTH_URL} from "../App";
import userService from "./user.service";

class AuthService {
    updateTokenIfExpired(username, password) {
        if (this.isTokenExpired()) {
            return
        }

        axios.post(OAUTH_URL, "", {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "grant_type": "password",
                "username": username,
                "password": password
            },
            auth: {
                username: API_USERNAME,
                password: API_PASSWORD
            }
        })
        .then(response => {
            let token = response.headers.authorization;
            let expiresAt = new Date().getMilliseconds() + response.headers.get("expires_in")
            localStorage.setItem("token", token);
            localStorage.setItem("expiresAt", expiresAt)
            localStorage.setItem("username", username)
            localStorage.setItem("password", password)
        })
    }

    login(username, password) {
        this.updateTokenIfExpired(username, password)
        let token = localStorage.getItem("token")
        if (!token) {
            return;
        }

        let user = userService.getByUsername(username)
        localStorage.setItem("currentUser", JSON.stringify(user))
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiresAt")
        localStorage.removeItem("currentUser");
    }

    isTokenExpired() {
        let expiredAt = Number(localStorage.getItem("expiresAt"))
        return expiredAt && new Date().getMilliseconds() < expiredAt
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("currentUser"));
    }

    isAuthenticated() {
        let username = localStorage.getItem("username");
        if (!username) {
            return false;
        }

        return !this.isTokenExpired();
    }
}

export default new AuthService();