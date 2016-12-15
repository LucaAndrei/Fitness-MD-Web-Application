import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import User from '../components/User.jsx';

var _ = require('lodash');


export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.renderUserData = this.renderUserData.bind(this);
  }

  renderUserData(userId) {
    console.log("here",userId);
    /*let users = this.props.users;
    var userProfile = users.filter(function(user, pos) {
        return users.indexOf(user) == pos && user._id == userId;
    })
    console.log("renderUserData",userProfile[0]);*/
  }


  render() {
    console.log("UserProfile this.props",this.props);
    const {
        profile
    } = this.props;

    this.renderUserData(this.props.params.userId);
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

      </tbody>
    </table>
    </div>
    );
  }
}