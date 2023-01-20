import {Route, Routes} from "react-router-dom";
import Tea from "./components/Tea";
import Extras from "./components/Extras";
import About from "./components/About";
import Blog from "./components/Blog";
import Contacts from "./components/Contacts";
import './styles/App.css';
import {Component} from "react";
import Bucket from "./components/Bucket";
import Header from "./components/Header";
import Administration from "./components/Administration";
import Profile from "./components/Profile";
import Login from "./components/forms/Login";

class App extends Component {

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
                        <Route path={"/blog"} element={<Blog/>}/>
                        <Route path={"/contacts"} element={<Contacts/>}/>
                        <Route path={"/bucket"} element={<Bucket/>}/>
                        <Route path={"/administration"} element={<Administration/>}/>
                        <Route path={"/profile"} element={<Profile/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>
                </div>

            </div>
        );
    }
}

export {App};
export const BACKEND_URL = "http://192.168.1.64:8080"; //TODO: environment variables
export const OAUTH_URL = BACKEND_URL + "/oauth/token"
export const API_USERNAME = "client" //TODO: environment variables
export const API_PASSWORD = "secret"//TODO: environment variables
