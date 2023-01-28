import React, {Component} from "react";
import Popup from "reactjs-popup";
import {Button, Container, Form} from "react-bootstrap";
import AuthService from "../../service/auth.service";

class Registration extends Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
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

    register(e, close) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        AuthService.register(this.state.login, this.state.password).then(
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
            <button className={"btn btn-secondary btn-block"}>
                <span>Зарегистрироваться</span>
            </button>
        } modal nested>
            { close => (
                <div className="login-container">
                    <Container>
                        <h3 id={"login-container-title"}>Регистрация</h3>

                        <Form onSubmit={(e) => this.register(e, close)}
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
                                    <span>Подтвердить</span>
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
                    </Container>
                </div>
            )}
        </Popup>;
    }
}

export default Registration;