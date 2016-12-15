import React from 'react';
import { Link } from 'react-router';

var _ = require('lodash');


export default class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = _.assign(this.state, { open: false });
    this.toggle = this.toggle.bind(this);
  }


  toggle(e) {
    e.stopPropagation();
    this.setState({
      open: !this.state.open,
    });
  }

  renderUsersLinks(myUsers) {
    return myUsers.map((user) => {
        console.log("render link to user",user);
        if(user._id != Meteor.userId() && user.profile.assignedDoctorId == Meteor.userId()) {


            return <li key={user._id}><Link
              to={`/chat/${user._id}`}
              className="button button--ujarak button--border-thin button--text-thick button--size-s button--border-medium"
              >
                            {user.emails[0].address}
                        </Link></li>
        }
    });
  }

    renderLoggedIn() {
        const { open } = this.state;
        const { user, logout, users } = this.props;
        const email = user.emails[0].address;
        const emailLocalPart = email.substring(0, email.indexOf('@'));
        console.log("user id : ",Meteor.userId());
        var isUserAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
        console.log("isUserAdmin",isUserAdmin);
        console.log("UserMenu this.props",this.props);

        return (
          <div className="user-menu">
            <ul>
                <li>
                    <a href="#toggle" className="button button--ujarak button--border-thin button--text-thick button--size-s button--border-medium" onClick={this.toggle}>
                      {open
                        ? <span className="icon-arrow-up" />
                        : <span className="icon-arrow-down" />}
                      {emailLocalPart}
                    </a>
                </li>
                <li>
                    {open
                      ? <a className="button button--ujarak button--border-thin
                                        button--text-thick button--size-s button--border-medium button--logout" onClick={logout}>
                           Logout
                      </a>
                    : null}
                </li>
                <li>
                    <Link to={`/chat/${user.profile.assignedDoctorId}`} className="button button--ujarak button--border-thin button--text-thick button--size-s button--border-medium">
                        Chat
                    </Link>
                </li>
                {isUserAdmin
                  ?  <li><Link to="/admin" className="button button--ujarak button--border-thin button--text-thick button--size-s button--border-medium">
                        Users
                    </Link></li>
                    : ""}
                {isUserAdmin ? this.renderUsersLinks(users) : ""}
            </ul>
          </div>
        );
    }

  renderLoggedOut() {
    return (
      <div className="user-menu">
        <ul>
            <li>
                <Link to="/signin" className="button button--ujarak button--border-thin button--text-thick button--size-s button--border-medium">
                    Login
                </Link>
            </li>
            <li>
                <Link to="/join" className="button button--ujarak button--border-thin button--text-thick button--size-s button--border-medium">
                    Join
                </Link>
            </li>
            <li>
                <Link to="/join" className="button button--ujarak button--border-thin button--text-thick button--size-s button--border-medium">
                    Join
                </Link>
            </li>
            <li>
                <Link to="/join" className="button button--ujarak button--border-thin button--text-thick button--size-s button--border-medium">
                    Join
                </Link>
            </li>
        </ul>


      </div>
    );
  }

  render() {
    return this.props.user
            ? this.renderLoggedIn()
            : this.renderLoggedOut();

  }
}

UserMenu.propTypes = {
  user: React.PropTypes.object,
  logout: React.PropTypes.func,
};
