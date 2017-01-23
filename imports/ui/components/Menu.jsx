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
    }


    toggle(e) {
        e.stopPropagation();
        this.setState({
            open: !this.state.open,
        });
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