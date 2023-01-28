import {BACKEND_URL} from "../App";
import userService from "./user.service";
import {AxiosResponse} from "axios";
import abstractService from "./abstract.service";
import Objects from "./objects";
import Bucket from "../bucket/Bucket";

class AuthService {
    login(username, password): Promise {
        return abstractService.postAnonymous(
            BACKEND_URL + "/rest/entities/u/login",
            { username: username, password: password }
        ).then((response) => {
            localStorage.setItem("currentUser", JSON.stringify(response.data));
            localStorage.setItem("username", username);
        }).then(() => {
            return abstractService.getAnonymous(BACKEND_URL + "/roles?username=" + username).then(response => {
                let roles = response.data;
                localStorage.setItem("roles", JSON.stringify(roles));
            });
        });
    }

    isAdmin(): Boolean {
        if (!Objects.isCorrect(localStorage.getItem("roles"))) {
            return false;
        }

        let roles = JSON.parse(localStorage.getItem("roles"));

        for (let i = 0; i < roles.length; i++) {
            let role = roles[i];
            if (Objects.isCorrect(role.roleCode) && role.roleCode === "system-full-access") {
                return true;
            }
        }

        return false;
    }

    register(username, password): Promise<AxiosResponse> {
        return userService.save(username, password)
            .then(response => this.login(username, password));
    }

    logout() {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("username");
        localStorage.removeItem("roles");

        Bucket.create();
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("currentUser"));
    }

    isAuthenticated(): Boolean {
        return Objects.isCorrect(localStorage.getItem("username"));
    }
}

export default new AuthService();