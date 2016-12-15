import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
//import { Lists } from '../../api/lists/lists.js';
//import ListList from '../components/ListList.jsx';
//import LanguageToggle from '../components/LanguageToggle.jsx';
//import ConnectionNotification from '../components/ConnectionNotification.jsx';
import UserMenu from '../components/UserMenu.jsx';
import Loading from '../components/Loading.jsx';
import Admin from '../pages/Admin.jsx';

export default class AdminLayout extends React.Component {
  constructor(props) {
    super(props);
    console.log("AdminLayout constructor");
    this.logout = this.logout.bind(this);
  }


  componentDidMount() {
    console.log("AdminLayout componentDidMount");
  }

  componentWillReceiveProps({ children }) {
    console.log("AdminLayout componentWillReceiveProps",children);
    if (!children) {
      console.log("AdminLayout go to random");
    }
  }

  logout() {
    console.log("logout");
     Meteor.logout();
     console.log("this.context",this);
     this.context.router.push("/");
  }

  render() {


    console.log("render AdminLayout");
    console.log(this.props);

    const {allUsers, user, loading} = this.props;
    const myVar = {};



    console.log("AdminLayout.jsx users",allUsers);

    return (
      <div id="container" >
        <section id="menu">
          <UserMenu user={user} logout={this.logout} myUsers={allUsers} />
        </section>
        <div id ="content-container">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
          {loading
              ? <Loading key="loading"/>
              : <Admin users = {allUsers} />}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

AdminLayout.contextTypes = {
  router: React.PropTypes.object,
};
