import authService from "./auth.service";

export default function authHeader() {
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    if (username) {
        authService.updateTokenIfExpired(username, password)
    }

    const token = localStorage.getItem("token");

    if (token) {
        return { Authorization: token };
    } else {
        return {};
    }
}