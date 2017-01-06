import React from 'react';
import {
    Link
} from 'react-router';


var _ = require('lodash');

let DEBUG = true;
let LOG_TAG = "imports/ui/components/Menu";
import {FaStar, FaCode, FaComment, FaUserPlus, FaEdit, FaBook} from 'react-icons/lib/fa'

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.assign(this.state, {
            open: false
        });
        this.toggle = this.toggle.bind(this);
        this.usernameFromEmail = this.usernameFromEmail.bind(this);
    }


    toggle(e) {
        e.stopPropagation();
        this.setState({
            open: !this.state.open,
        });
    }

    usernameFromEmail(user) {
        const email = user.emails[0].address;
        const emailLocalPart = email.substring(0, email.indexOf('@'));
        return emailLocalPart;
    }

    renderUsersLinks(myUsers) {
        return myUsers.map((user) => {
            if (user._id != Meteor.userId() && user.profile.assignedDoctorId == Meteor.userId()) {
                return (
                    <li key = {user._id}>
                        <Link to = {`/app/chat/${user._id}`}
                                className = "button button--ujarak button--text-thick button--size-s button--border-medium">
                            {user.emails[0].address}
                        </Link>
                    </li>
                )
            }
        });
    }


    renderLoggedIn() {
        const {
            open
        } = this.state;
        const {
            user,
            logout,
            users
        } = this.props;



        if (DEBUG) {
            console.log(LOG_TAG, "renderLoggedIn isUserAdmin : ",isUserAdmin);
        }



        return (

            <div className = "menu">
                <ul>
                    <li>
                        <a href = "#toggle"
                            className = "button button--ujarak button--text-thick button--size-s button--border-medium"
                            onClick = { this.toggle }>

                            {open
                                ?
                                    <span className = "icon-arrow-up" />
                                :
                                    <span className = "icon-arrow-down" />
                            }
                            {this.usernameFromEmail(user)}
                        </a>
                    </li>
                    <li>
                        {
                            open
                                ?
                                    <a className = "button button--ujarak button--text-thick button--size - s button--border - medium button--logout " onClick={logout}>
                                        Logout
                                    </a>
                                :
                                    null
                        }
                    </li>
                        {
                            isUserAdmin
                                ?
                                    <li>
                                        <Link to = "/app/admin" className = "menu-itembutton button--ujarak button--text-thick button--size-s button--border-medium">
                                            Users
                                        </Link>
                                    </li>
                                :
                                    "menu-item"
                        }
                        {
                            isUserAdmin
                                ?
                                    this.renderUsersLinks(users)
                                :
                                    (user.profile.assignedDoctorId
                                        ?
                                            <Link to = {`/app/chat/${user.profile.assignedDoctorId}`} className = "button button--ujarak button--text-thick button--size-s button--border-medium">
                                                {user.profile.assignedDoctorId}
                                            </Link>
                                        :
                                            "menu-item"
                                    )
                        }
                </ul>
            </div>
        );
    }

    menuItemClicked() {
        console.log("clicked");
    }

    renderLoggedOut() {

        return (
            <div className = "menu">
                <ul>
                    <li>
                        <Link to = "/signin" className = "button button--ujarak button--text-thick button--size-s button--border-medium">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to = "/join" className = "button button--ujarak button--text-thick button--size-s button--border-medium">
                            Join
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
    isMenuOpen (state) {
        console.log(LOG_TAG,"state",state);
        return state.isOpen;
    }

    closeMenu() {
        console.log("closeMenu");
    }

    render() {
        const {
            user,
            logout,
            users
        } = this.props;

        console.log(LOG_TAG,"this.props",this.props);

        const isUserAdmin = this.props.user && Roles.userIsInRole(Meteor.userId(), 'admin');
        return (

             <div className="menu">

                <Link to="/" className="menu-item menu-item-home" onClick={this.toggle}>
                    <h2><i className="fa fa-fw fa-heartbeat fa-2x" /><span>Fitness MD</span></h2>
                </Link>

                {
                    isUserAdmin
                        ?
                            <Link to="/app/admin" className="menu-item">
                                <i className="icon-menu fa fa-fw fa-users" /><span>Users</span>
                            </Link>
                        :
                            ""
                }

                {
                    this.props.user
                        ?
                            <Link to="/app/messages" className="menu-item">
                                <i className="icon-menu fa fa-fw fa-comments" /><span>Messages</span>
                            </Link>
                        :
                            <Link to="/signin" className="menu-item">
                                <i className="icon-menu fa fa-fw fa-sign-in" /><span>Login</span>
                            </Link>
                }






                <Link to="/about" className="menu-item">
                    <i className="icon-menu fa fa-fw fa-info" /><span>About</span>
                </Link>
                <Link to="/contact" className="menu-item">
                    <i className="icon-menu fa fa-fw fa-envelope" /><span>Contact</span>
                </Link>

                {
                    this.props.user
                        ?
                            <Link className="menu-item" onClick={logout}>
                                <i className="icon-menu fa fa-fw fa-sign-out" /><span>Logout</span>
                            </Link>
                        : ""
                }



            </div>
        );
    }
}

Menu.propTypes = {
    user: React.PropTypes.object,
    logout: React.PropTypes.func,
};