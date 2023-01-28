import {Component} from "react";
import Menu from "./Menu";
import {Link} from "react-router-dom";

import logo from "../assets/logo.svg";
import bucket from "../assets/bucket.png";
import administration from "../assets/administration.svg";
import logout from "../assets/logout.svg";
import authService from "../service/auth.service";
import profile from "./Profile";
import Login from "./popup/Login";
import Bucket from "../bucket/Bucket";

class Header extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        Bucket.onChange(() => {
            this.bucketItems.innerHTML = this.countBucketItems();
        });
        this.bucketItems.innerHTML = this.countBucketItems();
    }

    countBucketItems() {
        let items: Array = Bucket.get().items;
        let sum = 0;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            sum += Number(item.amount);
        }

        return sum;
    }

    logout() {
        authService.logout();
        window.location.href = "/";
    }

    render() {
        let authenticated = authService.isAuthenticated();
        return <header id={"header"}>
            <div id={"logo-container"}>
                <img id={"logo"} src={logo} alt={"Logo"}/>
            </div>

            <Menu/>

            <div id={"image-buttons"}>
                { !authenticated &&
                    <div className={"image-button"}>
                        <Login/>
                    </div>
                }
                <div className={"image-button"}>
                    <Link to={"/bucket"}>
                        <button className={"image-button__button spanned"}>
                            <img className={"image-button__image"} src={bucket} alt={"Bucket"}/>
                            <span className={"image-button__image-span"} ref={(i) => this.bucketItems = i}/>
                        </button>
                    </Link>
                </div>
                { authenticated &&
                    <div className={"image-button"}>
                        <Link to={"/profile"}>
                            <button className={"image-button__button"}>
                                <img className={"image-button__image"} src={profile} alt={"Профиль"}/>
                            </button>
                        </Link>
                    </div>
                }
                { authService.isAdmin() &&
                    <div className={"image-button"}>
                        <Link to={"/administration"}>
                            <button className={"image-button__button"}>
                                <img className={"image-button__image"} src={administration} alt={"Administration"}/>
                            </button>
                        </Link>
                    </div>
                }
                { authenticated &&
                    <div className={"image-button"}>
                        <button className={"image-button__button"} onClick={this.logout}>
                            <img className={"image-button__image"} src={logout} alt={"Logout"}/>
                        </button>
                    </div>
                }
            </div>

        </header>;
    }
}

export default Header;