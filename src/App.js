import {Route, Routes} from "react-router-dom";
import Tea from "./components/Tea";
import Extras from "./components/Extras";
import About from "./components/About";
import Contacts from "./components/Contacts";
import './styles/App.css';
import {Component} from "react";
import BucketComponent from "./components/BucketComponent";
import Header from "./components/Header";
import Administration from "./components/Administration";
import Profile from "./components/Profile";

import BucketClass from "./bucket/Bucket";
import OrderComponent from "./components/OrderComponent";

class App extends Component {
    componentDidMount() {
        if (!BucketClass.exists()) {
            BucketClass.create();
        }
    }

    login() {

    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div id={"body"}>
                    <Routes>
                        <Route path={"/"} element={<Tea/>}/>
                        <Route path={"/tea"} element={<Tea/>}/>
                        <Route path={"/extras"} element={<Extras/>}/>
                        <Route path={"/about"} element={<About/>}/>
                        <Route path={"/contacts"} element={<Contacts/>}/>
                        <Route path={"/bucket"} element={<BucketComponent/>}/>
                        <Route path={"/administration"} element={<Administration/>}/>
                        <Route path={"/profile"} element={<Profile/>}/>
                        <Route path={"/order"} element={<OrderComponent/>}/>
                    </Routes>
                </div>

            </div>
        );
    }
}

export {App};

//may improve if move to environment variable
export const BACKEND_URL = "http://192.168.1.60:8080";
export const OAUTH_URL = BACKEND_URL + "/oauth/token"
export const API_USERNAME = "client"
export const API_PASSWORD = "secret"
