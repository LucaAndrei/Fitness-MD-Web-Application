import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import AuthPage from './AuthPage.jsx';


var _ = require('lodash');


export default class JoinPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = _.assign(this.state, {errors : {} });

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("this",this);
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
    if(!isValidLength(password)) {
      errors.passwordLength = "Invalid password length";
    }
    if (confirm !== password) {
      errors.confirm = "password confirm";
    }


    console.log("email",email);
    console.log("password", password);
    console.log("confirm", confirm);
    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    let user = {
      email,
      password,
      profile : {
        assignedDoctorId : undefined
      }
    }



    Accounts.createUser({
      user
    }, (err) => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      }
      this.context.router.push('/');
    });
  }

  render() {
    const { errors } = this.state;
    const errorMessages = _.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const link = (
      <Link to="/signin" className="link-auth-alt">
        "sign in here"
      </Link>
    );

    const content = (

      <div className="auth-page">
            <div className="wrapper-auth">
                <h1 className="title-auth">
                  "Join"
                </h1>
                <p className="subtitle-auth">
                  "join reason"
                </p>
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
                    <div className={`input-symbol ${errorClass('confirm')}`}>
                        <input
                        type="password"
                        name="confirm"
                        ref={(c) => { this.confirm = c; }}
                        placeholder="password confirm"/>
                        <span
                            className="icon-lock"
                            title="your passwordconfirm"
                        />
                    </div>
                    <button>login</button>
                    {link}
                </form>
            </div>
        </div>
    );



    return <AuthPage content={content} />;
  }
}

JoinPage.contextTypes = {
  router: React.PropTypes.object,
};


function trimInput(val) {
    return val.replace(/^\s*|\s*$/g, "");
}

function isValidLength(val) {
    return val.length >= 6 ? true : false;
}