import {
    Meteor
} from 'meteor/meteor';
import React from 'react';
import {
    Link
} from 'react-router';
import {
    Component
} from 'react';
var _ = require('lodash');

import AuthPage from './AuthPage.jsx';

let LOG_TAG = "imports/ui/pages/SignInPage";

export default class SignInPage extends Component {
    constructor() {
        super();
        this.state = _.assign(this.state, {
            errors: {}
        });
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        const email = this.email.value;
        const password = this.password.value;
        const errors = {};

        console.log(LOG_TAG,"email", email);
        console.log(LOG_TAG,"password", password);

        if (!email) {
            errors.email = "email required";
        }
        if (!password) {
            errors.password = "password required";
        }

        this.setState({
            errors
        });
        if (_.keys(errors).length) {
            return;
        }

        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                this.setState({
                    errors: {
                        none: err.reason
                    },
                });
            } else {
                this.context.router.push('/app/admin');
            }
        });
    }

    render() {
        const {
            errors
        } = this.state;
        const errorMessages = _.keys(errors).map(key => errors[key]);
        const errorClass = key => errors[key] && 'error';
        const link = (
            <Link to = "/join" className = "link-auth-alt">Need an account? Join Now.</Link>
        );
        const content = (
            <div className = "form-page">
                <div className = "wrapper-form-page wrapper-authentication">
                    <h1 className = "form-page-title">Sign In.</h1>
                    <p className = "form-page-subtitle">Signing in allows you to view your profile</p>
                    <form onSubmit = {this.onSubmit}>
                        <div className = "list-errors">
                            {
                                errorMessages.map(msg => (
                                    <div className = "list-item"
                                        key = {msg}>
                                        {
                                            msg
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className = {`input-symbol ${errorClass('email')}`}>
                            <input type = "email" name = "email" ref = {(c) => {this.email = c;}} placeholder = "username" />
                        </div>
                        <div className = {`input-symbol ${errorClass('password')}`}>
                            <input type = "password" name = "password" ref = {(c) => {this.password = c;}} placeholder = "password" />
                        </div>
                        <button> login </button>
                        {link}
                    </form>
                </div>
            </div>
        );
        return <AuthPage content = {content}/>;
    }
}

SignInPage.contextTypes = {
    router: React.PropTypes.object,
};