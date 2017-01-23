import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import User from '../components/User.jsx';

let LOG_TAG = "imports/ui/pages/Admin";

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    renderUsers(users) {
        console.log(LOG_TAG,"Admin renderUsers");
        return users.map((user) => {
            var isUserAdmin = Roles.userIsInRole(user._id, 'admin');
            if(!isUserAdmin) {
                return (
                    <li key={user._id}><User user={user} /></li>
                )
            }
        });
    }

    render() {
        console.log(LOG_TAG,"Admin this.props", this.props);
        const {
            users
        } = this.props;


        return (
            <div className="content-scrollable container-fluid">
                <div className="col-md-6 col-md-offset-3 col-xs-12">
                    <div className="col-md-12 container_ui__heading"><p>users</p></div>
                    <ul className="userList">
                        {users.length > 0 ? this.renderUsers(users) : <p>no users</p>}
                    </ul>
                </div>
            </div>
        );
    }
}