import logo from './assets/logo.svg';
import {Route, Routes} from "react-router-dom";
import Tea from "./components/Tea";
import Extras from "./components/Extras";
import About from "./components/About";
import Blog from "./components/Blog";
import Contacts from "./components/Contacts";
import './styles/App.css';
import {Component} from "react";
import Menu from "./components/Menu";

class App extends Component {

    render() {
        return (
            <div className="App">
                <header id={"header"}>
                    <div id={"logo-container"}>
                        <img id={"logo"} src={logo} alt={"Logo"}/>
                    </div>

                    <Menu/>
                </header>

                <div id={"body"}>
                    <Routes>
                        <Route path={"/"} element={<Tea/>}/>
                        <Route path={"/tea"} element={<Tea/>}/>
                        <Route path={"/extras"} element={<Extras/>}/>
                        <Route path={"/about"} element={<About/>}/>
                        <Route path={"/blog"} element={<Blog/>}/>
                        <Route path={"/contacts"} element={<Contacts/>}/>
                    </Routes>
                </div>

                <footer id={"footer"}>
                    Footer
                </footer>
            </div>
        );
    }
}

export {App};
export const BACKEND_URL = "http://192.168.1.84:8080"; //TODO: environment variables
export const OAUTH_URL = BACKEND_URL + "/oauth/token"
export const API_USERNAME = "client" //TODO: environment variables
export const API_PASSWORD = "secret"//TODO: environment variables
