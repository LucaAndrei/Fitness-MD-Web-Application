import React from 'react';

import { Link } from 'react-router';

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/Contact";

var _ = require('lodash');

export default class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = _.assign(this.state, {
            errors: {}
        });

        this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit(event) {
        event.preventDefault();
        console.log("this", this);
        const name = this.name.value;
        const email = trimInput(this.email.value);
        const message = this.message.value;
        const errors = {};

        if (!email) {
            errors.email = "email required";
        }
        if(!name) {
            errors.name = "name required";
        }
        if(!message) {
            errors.message = "message required";
        }


        console.log("email", email);
        console.log("message", message);
        this.setState({
            errors
        });
        if (Object.keys(errors).length) {
            return;
        }

        const messageToInsert = {
            name,
            email,
            message
        };

        Meteor.call( 'insertContactMessage', messageToInsert, ( error ) => {
            if ( error ) {
                console.error(LOG_TAG,"ERROR INSERTING CONTACT MESSAGE",error);
            } else {
                if (DEBUG) {
                    console.log(LOG_TAG,"CONTACT MESSAGE WAS INSERTED SUCCESSFULLY" );
                }
            }
        });
    }




    render() {
        const user = this.props;
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }

        const {
            errors
        } = this.state;

        const errorMessages = _.keys(errors).map(key => errors[key]);
        const errorClass = key => errors[key] && 'error';

        return (
            <div className = "content-scrollable">
                <div className="container-fluid">
                    <h1>Contact</h1>
                    <div className = "contact-page">
                        <div className = "wrapper-contact">
                            <h1 className = "title-contact">Contact</h1>
                            <form onSubmit = {this.onSubmit}>
                                <div className = "list-errors">
                                    {errorMessages.map(msg => (
                                        <div className = "list-item" key = {msg}>
                                            {msg}
                                        </div>
                                        ))
                                    }
                                </div>
                                <div className = {`input-symbol ${errorClass('name')}`}>
                                    <input type = "text"
                                            name = "name"
                                            ref = {(c) => {
                                                                this.name = c;
                                                        }
                                                }
                                            placeholder = "Name" />
                                </div>
                                <div className = {`input-symbol ${errorClass('email')}`}>
                                    <input type = "email"
                                            name = "email"
                                            ref = {(c) => {
                                                                this.email = c;
                                                        }
                                                }
                                            placeholder = "E-mail" />
                                </div>
                                <div className = {`input-symbol ${errorClass('message')}`}>
                                    <textarea type = "text"
                                            name = "message"
                                            ref = {
                                                (c) => {
                                                    this.message = c;
                                                }
                                            }
                                            placeholder = "Message" />
                                </div>
                                <button> Send </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


function trimInput(val) {
    return val.replace(/^\s*|\s*$/g, "");
}

function isValidLength(val) {
    return val.length>= 6 ? true : false;
}