import React from 'react';

import { assignDoctor } from '../../api/users/methods.js'
import { Link } from 'react-router';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/User";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAssigned: props.user.profile.assignedDoctorId ? true : false
        };
        this.assign = this.assign.bind(this);
    }


    isCurrentUser(currentUserId) {
        var isUser = currentUserId === Meteor.userId() ? true : false;
        if (DEBUG) {
            console.log(LOG_TAG,"isCurrentUser : ",isUser);
        }
        return isUser;
    }

    currentUserEmail(user) {
        if (!this.isCurrentUser(user._id)) {
            return (
                <Link
                    to = {`/app/profile/${user._id}`}
                    className = "button button--ujarak button--border-thin button--text-thick button--size-s button--border-medium">
                    {user.emails[0].address}
                </Link>
            )
        } else {
            return user.emails[0].address;
        }
    }



    assign() {
        if (DEBUG) {
            console.log(LOG_TAG,"assign");
        }
        this.setState({
            isAssigned: !this.state.isAssigned
        });
        assignDoctor.call({
            userId: this.props.user._id,
            doctorId: Meteor.userId(),
            shouldAssign: !this.state.isAssigned
        }, function(error) {
            console.log("display error", error);
        });
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
                <div className="col-md-10 col-xs-10">
                    <Link to = {`/app/profile/${this.props.user._id}`}>
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
                                        <div className="info col-md-4 col-xs-4"><span>135357<br /><small>Steps</small></span></div>
                                        <div className="info col-md-4 col-xs-4"><span>55.7<br /><small>Kg</small></span></div>
                                        <div className="info col-md-4 col-xs-4"><span>13:24:33<br /><small>Time active</small></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-2 col-xs-2 user-functions">
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