import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import Menu from '../components/Menu.jsx';
import Loading from '../components/Loading.jsx';
import MobileMenu from '../components/MobileMenu.jsx';
let DEBUG = true;
let LOG_TAG = "imports/ui/layouts/App";

export default class App extends React.Component {
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
      console.log("prevProps",prevProps);
      console.log("prevState",prevState);
      console.log("props after update",this.props);
      if (this.props.user == null || this.props.user == undefined) {
        this.context.router.push("/signin");
      }

  }

  shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate")
        console.log("nextProps",nextProps)
        console.log("nextState",nextState);
        console.log("this.state",this.state)
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
        console.log("clonedChildren",clonedChildren);


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

App.propTypes = {
  //user: React.PropTypes.object,      // current meteor user
  //connected: React.PropTypes.bool,   // server connection status
  loading: React.PropTypes.bool,     // subscription status
  menuOpen: React.PropTypes.bool,    // is side menu open?
  //lists: React.PropTypes.array,      // all lists visible to the current user
  //children: React.PropTypes.element, // matched child route component
  //location: React.PropTypes.object,  // current router location
  //params: React.PropTypes.object,    // parameters of the current route
};

App.contextTypes = {
    router: React.PropTypes.object,
};