import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import User from '../components/User.jsx';

var _ = require('lodash');


export default class Admin extends React.Component {
  constructor(props) {
    super(props);
  }



  renderUsers(users) {
    console.log("Admin renderUsers");
    return users.map((user) => {
        console.log("user",user);
        return <User user={user} key = {user._id} />;
    });
  }

  render() {
    console.log("Admin this.props",this.props);
    const {
        users
    } = this.props;


    return (
        <div>
      <h4 className="page-header">Users</h4>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Email Address</th>
          <th className="text-center">Role</th>
        </tr>
      </thead>
      <tbody>
        {this.renderUsers(users)}

      </tbody>
    </table>
    </div>
    );
  }
}