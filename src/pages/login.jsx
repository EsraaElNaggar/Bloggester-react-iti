import React, { Component } from 'react';
import Joi from "joi-browser";
import axios from 'axios';

import Input from "../components/input";
import { setTokenToLocalStorage, setUserToLocalStorage } from '../_utilities/storager';

class Login extends Component {
    state = {
        account: {
            userEmail: "",
            userPassword: "",
        },
        errors: {}
    };
    schema = {
        userEmail: Joi.string()
            .email({ minDomainAtoms: 2 })
            .label("Email"),
        userPassword: Joi.string()
            .required()
            .min(9)
            .max(30)
            .label("Password"),
    };
    handleSubmit = e => {
        e.preventDefault();
        //Validation :
        const errors = this.validate();
        if (errors) {
            this.setState({ errors });
            return;
        }
        //valid
        this.setState({ errors: {} });
        //Call backend
        this.login(this.state.account);
    };

    validate = () => {
        const result = Joi.validate(this.state.account, this.schema, {
            abortEarly: false
        });
        //No Errors
        if (result.error === null) {
            return null;
        }
        //Errors
        const errors = {};
        for (const error of result.error.details) {
            errors[error.path] = error.message;
        }
        return errors;
    };
    handleChange = ({ target }) => {
        //Clone
        const account = { ...this.state.account };
        //Edit
        account[target.id] = target.value;
        //Set Satate
        this.setState({ account });
    };

    login = ({ userEmail, userPassword }) => {
        axios.post(process.env.REACT_APP_BACKEND_URL + "/api/user/login", { userEmail, userPassword })
            .then(res => {
                setTokenToLocalStorage(res.data.token);
                setUserToLocalStorage(res.data.user);
                this.props.history.replace("/home");
            })
    };

    render() {
        return (
            <React.Fragment>
                <div style={{ textAlign: "center" }}>
                    <a href="/landingPage" className="Bloggester" style={{ fontFamily: '"Pacifico", cursive', color: 'gold', textDecoration: "none" }}>Bloggester</a>
                </div>
                <div style={{ display: "flex", flexFlow: "column" }}>
                    <form className="form" onSubmit={this.handleSubmit} >
                        <h2 className="formTitle">Login</h2>
                        <Input
                            placeholder="Email"
                            name="userEmail"
                            type="email"
                            value={this.state.account.userEmail}
                            error={this.state.errors.userEmail}
                            onChange={this.handleChange}
                            autoFocus
                            autoComplete="on" />
                        <Input
                            placeholder="Password"
                            name="userPassword"
                            type="password"
                            value={this.state.account.userPassword}
                            error={this.state.errors.userPassword}
                            onChange={this.handleChange}
                        />
                        <button className="formBtn">Login</button>
                    </form>
                    <div style={{ marginTop: "5%", textAlign: "center" }}>
                        <p className="create">Create an account from here...</p>
                        <a href="/signUp" className="formBtn createBtn">Sign Up</a>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default Login;