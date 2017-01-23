import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import Menu from '../components/Menu.jsx';
import Loading from '../components/Loading.jsx';
import MobileMenu from '../components/MobileMenu.jsx';
let DEBUG = true;
let LOG_TAG = "imports/ui/layouts/AuthenticatedApp";

export default class AuthenticatedApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
        };
        this.logout = this.logout.bind(this);
    }

    toggleMenu(menuOpen = !Session.get('menuOpen')) {
        Session.set({ menuOpen });
    }


    componentDidUpdate(prevProps, prevState) {
        console.log(LOG_TAG,"prevProps",prevProps);
        console.log(LOG_TAG,"prevState",prevState);
        console.log(LOG_TAG,"props after update",this.props);
        if (this.props.user == null || this.props.user == undefined) {
            this.context.router.push("/signin");
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(LOG_TAG,"shouldComponentUpdate")
        console.log(LOG_TAG,"nextProps",nextProps)
        console.log(LOG_TAG,"nextState",nextState);
        console.log(LOG_TAG,"this.state",this.state)
        return true;
    }

    logout() {
        if (DEBUG) {
            console.log(LOG_TAG, "logout");
        }
        Meteor.logout();
        this.context.router.push("/");
    }

    render() {
        const {
            user,
            loading,
            children,
            menuOpen,
            location,
            allUsers,
            messages
        } = this.props;

        const closeMenu = this.toggleMenu.bind(this, false);

        if (DEBUG) {
            console.log(LOG_TAG, "render this.props : ",this.props);
        }

        // clone route components with keys so that they can have transitions
        const clonedChildren = children && React.cloneElement(children, {
            key: location.pathname,
            users: allUsers
        });
        console.log(LOG_TAG,"clonedChildren",clonedChildren);


        return (
            <div id="container" className={menuOpen ? 'menu-open' : ''}>
                <section id="menu">
                    <Menu user={user} logout={this.logout} />
                </section>
                <div className="content-overlay" onClick={closeMenu} />
                <div id="content-container">
                    <nav className="list-header">
                        <MobileMenu />
                    </nav>
                    <div className="admin-page">
                        <ReactCSSTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}>
                            {loading
                            ? <Loading key="loading" />
                            : clonedChildren}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </div>
        );
    }
}

AuthenticatedApp.propTypes = {
    loading: React.PropTypes.bool,     // subscription status
    menuOpen: React.PropTypes.bool
};

AuthenticatedApp.contextTypes = {
    router: React.PropTypes.object,
};