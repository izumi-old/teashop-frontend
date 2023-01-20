import {Component} from "react";
import Menu from "./Menu";
import {Link} from "react-router-dom";

import logo from "../assets/logo.svg";
import bucket from "../assets/bucket.png";
import administration from "../assets/administration.svg";
import login from "../assets/login.svg";
import logout from "../assets/logout.svg";
import authService from "../service/auth.service";
import roleService from "../service/role.service";
import profile from "./Profile";

class Header extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
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
                        <Link to={"/login"}>
                            <button className={"image-button__button"}>
                                <img className={"image-button__image"} src={login} alt={"Login"}/>
                            </button>
                        </Link>
                    </div>
                }
                { authenticated &&
                    <div className={"image-button"}>
                        <Link to={"/bucket"}>
                            <button className={"image-button__button"}>
                                <img className={"image-button__image"} src={bucket} alt={"Bucket"}/>
                            </button>
                        </Link>
                    </div>
                }
                { authenticated &&
                    <div className={"image-button"}>
                        <Link to={"/profile"}>
                            <button className={"image-button__button"}>
                                <img className={"image-button__image"} src={profile} alt={"Profile"}/>
                            </button>
                        </Link>
                    </div>
                }
                {/*TODO: get real admin code */}
                { roleService.currentUserHasRoleWithName("admin") &&
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