import React from 'react';

import { Link } from 'react-router';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/MessagesUserlistUser";

export default class MessagesUserlistUser extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        const user = this.props;
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }
        const email = user.user.emails[0].address;
        const emailLocalPart = email.substring(0, email.indexOf('@'));
        return (
            <div className="row user-container">
                <div className="col-xs-12">
                    <div className="user-info">
                        <div className="user-image">
                            <div className="row">
                                <div className="col-xs-3 user-image">
                                    <div className="picture">
                                        <img className = "img-responsive img-circle" src='https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg' />
                                    </div>
                                </div>
                                <div className="col-xs-9">
                                    <div className="user-name"><span>Mark Brack</span><br /><i className="badge fa fa-check"></i></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="footer">
                                    <div className="info col-md-12"><span>subj: thanks, you are amazing</span></div>
                                    <div className="info col-md-12"><span>Your generous donation saved 3 million puppies...</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}