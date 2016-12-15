import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
//import { Lists } from '../../api/lists/lists.js';
import UserMenu from '../components/UserMenu.jsx';
//import ListList from '../components/ListList.jsx';
//import LanguageToggle from '../components/LanguageToggle.jsx';
//import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = {
      menuOpen: false,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillReceiveProps({ loading, children }) {
    console.log("componentWillReceiveProps",loading,children);
    if (!loading && !children) {
      console.log("go to random");
    }
  }

  toggleMenu(menuOpen = !Session.get('menuOpen')) {
    //Session.set({ menuOpen });
    console.log("toggleMenu");
  }

  logout() {
    console.log("logout");
     Meteor.logout();
     console.log("this.context",this);
     this.context.router.push("/");
  }

  render() {

    console.log("render App");
    console.log("Applocation",location);
    console.log("App props",this.props);

    const {
        user,
        loading,
        children,
        location,
        allUsers
    } = this.props;


    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
      users : allUsers
    });

    console.log("clonedChildren",clonedChildren);


    console.log("loading",loading);



    return (
      <div id="container" >
        <section id="menu">
          <UserMenu user={user} logout={this.logout} users={allUsers} />
        </section>
        <div id ="content-container">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
          {loading
              ? <Loading key="loading"/>
              : clonedChildren}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

/*App.propTypes = {
  //user: React.PropTypes.object,      // current meteor user
  //connected: React.PropTypes.bool,   // server connection status
  //loading: React.PropTypes.bool,     // subscription status
  //menuOpen: React.PropTypes.bool,    // is side menu open?
  //lists: React.PropTypes.array,      // all lists visible to the current user
  //children: React.PropTypes.element, // matched child route component
  //location: React.PropTypes.object,  // current router location
  //params: React.PropTypes.object,    // parameters of the current route
};*/

App.contextTypes = {
  router: React.PropTypes.object,
};
