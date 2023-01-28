import React, {Component} from "react";
import Popup from "reactjs-popup";
import {Button, Container, Form} from "react-bootstrap";

import logout from "../../assets/logout.svg";
import AuthService from "../../service/auth.service";

import "../../styles/components/popup/Login.css";
import Registration from "./Registration";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            login: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeLogin(e) {
        this.setState({
            login: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e, close) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        AuthService.login(this.state.login, this.state.password).then(
            () => {
                close();
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );
    }

    render() {
        return <Popup className={"cart-popup"} trigger={
            <Button variant={"link"}>
                <img className={"image-button__image"} src={logout} alt={"Logout"}/>
            </Button>
        } modal nested>
            { close => (
                <div className="login-container">
                    <Container>
                        <h3 id={"login-container-title"}>Авторизация</h3>

                        <Form onSubmit={(e) => this.handleLogin(e, close)}
                              ref={c => {this.form = c;}}>
                            <div className="form-group">
                                <Form.Control type={"text"} name={"login"} className={"form-control"} value={this.state.login}
                                              placeholder={"Логин"} onChange={this.onChangeLogin}/>
                            </div>

                            <div className="form-group">
                                <Form.Control type={"password"} name={"password"} className={"form-control"}
                                              placeholder={"Пароль"} value={this.state.password} onChange={this.onChangePassword}/>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block" disabled={this.state.loading}>
                                    { this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"/>
                                    ) }
                                    <span>Войти</span>
                                </button>
                            </div>

                            {this.state.message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                            <Button style={{ display: "none" }} ref={c => {this.checkBtn = c;}}/>
                        </Form>

                        <div className={"form-group"}>
                            <Registration/>
                        </div>
                    </Container>
                </div>
            )}
        </Popup>
    }
}

export default Login;