import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import { Component } from 'react';
var _ = require('lodash');

import AuthPage from './AuthPage.jsx';

export default class SignInPage extends Component {
  constructor() {
    super();
    console.log("SignInPage constructor");
    console.log("Object",Object);
    console.log("this.state before",this.state);
    this.state = _.assign(this.state, {errors : {} });
    //this.state = _.assign(this.state, { errors: {} });
    console.log("this.state after",this.state);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const email = this.email.value;
    const password = this.password.value;
    const errors = {};

    console.log("email",email);
    console.log("password", password);

    if (!email) {
      errors.email = "email required";
    }
    if (!password) {
      errors.password = "password required";
    }

    this.setState({ errors });
    if (_.keys(errors).length) {
        console.log("return boss");
      return;
    }

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      } else {
        this.context.router.push('/');
      }
    });
  }

  render() {
    const { errors } = this.state;
    const errorMessages = _.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';
    const link = (
        <p className="message">Not registered?
            <Link to="/join" className="link-auth-alt">Create an account</Link>
        </p>
    );
    const content = (
        <div className="auth-page">
            <div className="wrapper-auth">
                <form onSubmit={this.onSubmit}>
                    <div className="list-errors">
                        {errorMessages.map(msg => (
                            <div className="list-item" key={msg}>{msg}</div>
                        ))}
                    </div>
                    <div className={`input-symbol ${errorClass('email')}`}>
                        <input
                            type="email"
                            name="email"
                            ref={(c) => { this.email = c; }}
                            placeholder="username"/>
                         <span
                            className="icon-email"
                            title="your email"
                        />
                    </div>
                    <div className={`input-symbol ${errorClass('password')}`}>
                        <input
                        type="password"
                        name="password"
                        ref={(c) => { this.password = c; }}
                        placeholder="password"/>
                        <span
                            className="icon-lock"
                            title="your password"
                        />
                    </div>
                    <button>login</button>
                    {link}
                </form>
            </div>
        </div>
    );


    console.log("content",content);
    console.log("link",link);

    return <AuthPage content={content} />;
  }
}

SignInPage.contextTypes = {
  router: React.PropTypes.object,
};
