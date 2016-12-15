import React from 'react';

import {assignDoctor} from '../../api/users/methods.js'

import { Link } from 'react-router';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    console.log("props",props)
    console.log("this.props",this.props);
    this.state = {
        value: props.user.roles[0],
        isAssigned : props.user.profile.assignedDoctorId ? true : false
    };

    this.handleChange = this.handleChange.bind(this);
    this.assign = this.assign.bind(this);
  }


  isCurrentUser(currentUserId) {
    var isUser = currentUserId === Meteor.userId() ? true : false;
    console.log("isCurrentUser",isUser);
    return isUser;
  }

  currentUserEmail(user) {
    if (!this.isCurrentUser(user._id)) {
        return <Link
              to={`/user/profile/${user._id}`}
              className="button button--ujarak button--border-thin button--text-thick button--size-s button--border-medium"
              >
                            {user.emails[0].address}
                        </Link>
    } else {
        return user.emails[0].address;
    }
  }

  handleChange(event) {
    console.log("handleChange")
    this.setState({value: event.target.value});

  }

  disableIfAdmin(userId) {
    console.log("disableIfAdmin");
    if ( Meteor.userId() === userId ) {
        console.log("userId is the same");
        var shouldDisable= Roles.userIsInRole( userId, 'admin' ) ? "disabled" : "";
    }
    console.log("shouldDisable",shouldDisable);
    return shouldDisable;
  }

  assign() {
    console.log("assign",this.props);
    this.setState({isAssigned : !this.state.isAssigned});
    assignDoctor.call({userId : this.props.user._id, doctorId : Meteor.userId(), shouldAssign : !this.state.isAssigned }, function(error) {
        console.log("display error",error);
    });
  }

  render() {
    const user = this.props;
    console.log("User",this.props, this.props.user.emails[0].address);
    var inputProps = {
        disabled : this.disableIfAdmin(user.user._id)
    }
    console.log("inputProps",inputProps)
    return (
        <tr>
            <td className="text-left text-middle">
                {this.isCurrentUser(user.user._id)
                    ? <p><label className="label label-success">You!</label>{this.currentUserEmail(user.user)}</p>
                    : this.currentUserEmail(user.user) }
            </td>
            <td>
                <select {...inputProps} name="userRole" className="form-control"
                        value={this.state.value} onChange={this.handleChange}>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                </select>
            </td>
            {!this.isCurrentUser(user.user._id) ?
            <td><a className="button button--ujarak button--border-thin
                                        button--text-thick button--size-s button--border-medium button--logout" onClick={this.assign}>
                           {this.state.isAssigned ? <span className="btn-primary">Remove</span> : <span>assign</span>}
                      </a></td> : ""}
        </tr>
    )
    }
}

