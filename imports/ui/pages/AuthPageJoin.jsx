import React from 'react';
import {
    Link
} from 'react-router';
import {
    Accounts
} from 'meteor/accounts-base';

import AuthPage from './AuthPage.jsx';


var _ = require('lodash');

let LOG_TAG = "imports/ui/pages/JoinPage";


export default class JoinPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.assign(this.state, {
            errors: {}
        });

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(LOG_TAG,"onSubmit this", this);
        const username = this.username.value;
        const email = trimInput(this.email.value);
        const password = this.password.value;
        const confirm = this.confirm.value;
        const errors = {};

        if (!email) {
            errors.email = "email required";
        }
        if (!password) {
            errors.password = "password required";
        }
        if (!isValidLength(password)) {
            errors.passwordLength = "Invalid password length";
        }
        if (confirm !== password) {
            errors.confirm = "password confirm";
        }
        if (!username) {
            errors.username = "username required";
        }

        console.log(LOG_TAG,"username", username);
        console.log(LOG_TAG,"email", email);
        console.log(LOG_TAG,"password", password);
        console.log(LOG_TAG,"confirm", confirm);
        this.setState({
            errors
        });
        if (Object.keys(errors).length) {
            return;
        }

        Accounts.createUser({
            username,
            email,
            password,
            profile : {
                assignedDoctorId: undefined
            }
        }, (err) => {
            if (err) {
                console.log(LOG_TAG,"user",user);
                this.setState({
                    errors: {
                        none: err.reason
                    },
                });
            }
            this.context.router.push('/app/admin');
        });
    }

    render() {
        const {
            errors
        } = this.state;
        const errorMessages = _.keys(errors).map(key => errors[key]);
        const errorClass = key => errors[key] && 'error';

        const link = (
                <Link to = "/signin" className = "link-auth-alt">Have an account? Sign in</Link>
        );

        const content = (

            <div className = "form-page">
                <div className = "wrapper-form-page wrapper-authentication">
                    <h1 className = "form-page-title">Join.</h1>
                    <p className = "form-page-subtitle">Joining allows you to manage your profile</p>
                    <form onSubmit = {this.onSubmit}>
                        <div className = "list-errors">
                            {errorMessages.map(msg => (
                                <div className = "list-item" key = {msg}>
                                    {msg}
                                </div>
                                ))
                            }
                        </div>
                        <div className = {`input-symbol ${errorClass('username')}`}>
                            <input
                                type = "text"
                                name = "username"
                                ref = {(c) => {
                                    this.username = c;
                                }}
                                placeholder = "name"
                            />
                        </div>
                        <div className = {`input-symbol ${errorClass('email')}`}>
                            <input
                                type = "email"
                                name = "email"
                                ref = {(c) => {
                                    this.email = c;
                                }}
                                placeholder = "email"
                            />
                        </div>
                        <div className = {`input-symbol ${errorClass('password')}`}>
                            <input
                                type = "password"
                                name = "password"
                                ref = {
                                    (c) => {
                                        this.password = c;
                                    }}
                                placeholder = "password"
                            />
                        </div>
                        <div className = {`input-symbol ${errorClass('confirm')}`}>
                            <input
                                type = "password"
                                name = "confirm"
                                ref = {
                                    (c) => {
                                        this.confirm = c;
                                    }}
                                placeholder = "password confirm"
                            />
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

JoinPage.contextTypes = {
    router: React.PropTypes.object,
};


function trimInput(val) {
    return val.replace(/^\s*|\s*$/g, "");
}

function isValidLength(val) {
    return val.length>= 6 ? true : false;
}