import React, { Component } from 'react';

import Joi from "joi-browser";
import Input from "../components/input";
import Textarea from '../components/textarea';

class ContactUs extends Component {
    state = {
        account: {
            yourName: "",
            yourEmail: "",
        },
        errors: {}
    };
    schema = {
        yourName: Joi.string()
            .required()
            .label("Your Name"),
        yourEmail: Joi.string()
            .email({ minDomainAtoms: 2 })
            .label("Your Email"),
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
    render() {
        return (
            <React.Fragment>
                <form className="form contact" onSubmit={this.handleSubmit}>
                    <div style={{ textAlign: "center" }}>
                        <a href="/home" className="Bloggester" style={{ fontFamily: '"Pacifico", cursive', color: 'gold', textDecoration: "none" }}>Bloggester</a>
                    </div>
                    <h2 className="formTitle">Contact Us</h2>

                    <Input
                        placeholder="Your Name"
                        name="yourName"
                        type="text"
                        value={this.state.account.yourName}
                        error={this.state.errors.yourName}
                        onChange={this.handleChange}
                        autoFocus
                        autoComplete="on" />
                    <Input
                        placeholder="Your Email"
                        name="yourEmail"
                        type="email"
                        value={this.state.account.youEmail}
                        error={this.state.errors.yourEmail}
                        onChange={this.handleChange}
                        autoComplete="on" />

                    <Textarea
                        placeholder="Your Message"
                        name="message"
                    />
                    <button className="formBtn">Submit</button>
                </form>
            </React.Fragment>

        );
    }
}

export default ContactUs;