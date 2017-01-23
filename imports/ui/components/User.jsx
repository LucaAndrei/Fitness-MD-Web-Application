import React from 'react';

import { Link } from 'react-router';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/User";

export default class User extends React.Component {
    constructor(props) {
        super(props);
    }

    /*
        http://codepen.io/icebob/pen/wMJpaw
    */

    render() {
        const user = this.props;
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }
        return (
            <div className="row user-container">
                <div className="col-md-10 col-xs-9">
                    <Link to = {`/app/profile/${this.props.user._id}`}>
                        <div className="user-info">
                            <div className="user-image">
                                <div className="row">
                                    <div className="col-md-3 col-xs-5 user-image">
                                        <div className="picture">
                                            <img className = "img-responsive img-circle" src='https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg' />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="user-name"><span>{this.props.user.username}</span><br /><i className="badge fa fa-check"></i></div>
                                    </div>
                                </div>
                                <div className="row user-pedometer-details">
                                    <div className="footer">
                                        <div className="info col-md-4 col-xs-4"><span>135357<br /><small>Steps</small></span></div>
                                        <div className="info col-md-4 col-xs-4"><span>55.7<br /><small>Kg</small></span></div>
                                        <div className="info col-md-4 col-xs-4"><span>13:24:33<br /><small>Time active</small></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-1 col-xs-3 user-functions">
                    <Link to = {`/app/chat/${this.props.user._id}`}>
                        <div className="functions">
                            <i className="fa fa-envelope fa-2x"></i>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}