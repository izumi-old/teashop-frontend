import React, { Component } from "react";

import unknownProfile from "../../assets/administration.svg";
import AuthService from "../../service/auth.service";
import {Button, Container, Form} from "react-bootstrap";
import {email, required, vPassword} from "../../service/validation.service";

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

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        //this.form.validateAll(); TODO:

        /*if (this.checkBtn.context._errors.length === 0) { TODO*/
            AuthService.login(this.state.login, this.state.password).then(
                () => {
                    //this.props.history.push("/profile");
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
        /*} else { TODO
            this.setState({
                loading: false
            });
        }*/
    }

    render() {
        return (
            <div className="login-container">
                <Container className={"w-25"}>
                    <img src={unknownProfile} alt="profile-img"
                         className="img-thumbnail align-self-center" width={"256px"}/>

                    <Form onSubmit={this.handleLogin} ref={c => {this.form = c;}}>
                        <div className="form-group">
                            <label htmlFor="login">Логин</label>
                            <Form.Control type={"text"} name={"login"} className={"form-control"} value={this.state.login}
                                   onChange={this.onChangeLogin}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <Form.Control type={"password"} name={"password"} className={"form-control"}
                                   value={this.state.password} onChange={this.onChangePassword}/>
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
                </Container>
            </div>
        );
    }
}

export default Login;