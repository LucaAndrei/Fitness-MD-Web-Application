import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import User from '../components/User.jsx';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    renderUsers(users) {
        console.log("Admin renderUsers");
        return users.map((user) => {
            console.log("user", user);
            var isUserAdmin = Roles.userIsInRole(user._id, 'admin');
            if(!isUserAdmin) {
                return (
                    <li key={user._id}><User user={user} /></li>
                )
            }
        });
    }

    render() {
        console.log("Admin this.props", this.props);
        const {
            users
        } = this.props;


        return (
            <div className="content-scrollable container-fluid">
                <h1>MessagesUserlist</h1>
                <div className="col-md-6 col-md-offset-3 col-xs-12">
                    <div className="col-md-12 container_ui__heading"><p>users</p></div>
                    <ul className="userList">
                        {this.renderUsers(users)}
                    </ul>
                </div>
            </div>
        );
    }
}