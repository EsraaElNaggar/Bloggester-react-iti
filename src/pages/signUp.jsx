import React, { Component } from 'react';
import Joi from "joi-browser";
import axios from 'axios';

import Input from "../components/input";
import ImgInput from '../components/imgInput';

class SignUp extends Component {
    state = {
        account: {
            userImg: "",
            firstName: "",
            lastName: "",
            userTitle: "",
            userEmail: "",
            userPassword: "",
            confirmPassword: ""
        },
        errors: {}
    };
    schema = {
        userImg: Joi.label("Profile Picture"),
        firstName: Joi.string()
            .required()
            .label("First Name"),
        lastName: Joi.string()
            .required()
            .label("Last Name"),
        userTitle: Joi.string()
            .required()
            .label("Job Title"),
        userEmail: Joi.string()
            .email({ minDomainAtoms: 2 })
            .label("Email"),
        userPassword: Joi.string()
            .required()
            .min(9)
            .max(30)
            .label("Password"),
        confirmPassword: Joi.ref('userPassword')

    };
    handleSubmit = e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('myImage', this.state.account.userImg);
        formData.append('firstName', this.state.account.firstName);
        formData.append('lastName', this.state.account.lastName);
        formData.append('userTitle', this.state.account.userTitle);
        formData.append('userEmail', this.state.account.userEmail);
        formData.append('userPassword', this.state.account.userPassword);

        console.log(formData);
        //Validation :
        const errors = this.validate();
        if (errors) {
            this.setState({ errors });
            return;
        }
        //valid
        this.setState({ errors: {} });
        //Call backend
        this.register(formData);
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
        if (target.files) {
            console.log(target.files[0]);
            console.log(target.id);
            account[target.id] = target.files[0];
        }
        else {
            console.log(target);
            account[target.id] = target.value;
        }
        //Set Satate
        this.setState({ account });
    };

    register = (formData) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        axios.post(process.env.REACT_APP_BACKEND_URL + "/api/user/register", formData, config)
            .then(res => {
                this.props.history.replace("/login");
            })
            .catch(err => {
                this.props.history.replace("/error");
            })
    };


    render() {
        return (
            <React.Fragment >
                <form className="form reg" onSubmit={this.handleSubmit}>
                    <div style={{ textAlign: "center" }}>
                        <a href="/landingPage" className="Bloggester" style={{ fontFamily: '"Pacifico", cursive', color: 'gold', textDecoration: "none" }}>Bloggester</a>
                    </div>
                    <h2 className="formTitle">Register</h2>
                    <ImgInput
                        name="userImg"
                        onChange={this.handleChange}
                    />
                    <div style={{ padding: "1%" }}></div>
                    <Input
                        placeholder="First Name"
                        name="firstName"
                        type="text"
                        value={this.state.account.firstName}
                        error={this.state.errors.firstName}
                        onChange={this.handleChange}
                        autoFocus
                        autoComplete="on" />
                    <Input
                        placeholder="Last Name"
                        name="lastName"
                        type="text"
                        value={this.state.account.lastName}
                        error={this.state.errors.lastName}
                        onChange={this.handleChange}
                        autoComplete="on" />
                    <Input
                        placeholder="Job Title"
                        name="userTitle"
                        type="text"
                        value={this.state.account.userTitle}
                        error={this.state.errors.userTitle}
                        onChange={this.handleChange}
                        autoComplete="on" />
                    <div style={{ padding: "1%" }}></div>
                    <Input
                        placeholder="Email"
                        name="userEmail"
                        type="email"
                        value={this.state.account.userEmail}
                        error={this.state.errors.userEmail}
                        onChange={this.handleChange}
                        autoComplete="on" />
                    <Input
                        placeholder="Password"
                        name="userPassword"
                        type="password"
                        value={this.state.account.userPassword}
                        error={this.state.errors.userPassword}
                        onChange={this.handleChange} />
                    <Input
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={this.state.account.confirmPassword}
                        error={this.state.errors.confirmPassword}
                        onChange={this.handleChange} />
                    <button className="formBtn">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}

export default SignUp;