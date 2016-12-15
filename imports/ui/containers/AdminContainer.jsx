import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import  users  from '../../api/users/users.js';
import AdminLayout from '../layouts/AdminLayout.jsx';

export default createContainer(() => {
  //const publicHandle = Meteor.subscribe('lists.public');
  //const privateHandle = Meteor.subscribe('lists.private');
  const usersHandle = Meteor.subscribe('users');
  //console.log("AdminContainer usersHandle",usersHandle);
  //console.log("users",Meteor.users);
  console.log("AdminContainer");
  console.log("AdminContainer allUsers",Meteor.users.find({}).fetch())
  return {
    user: Meteor.user(),
    loading: !(usersHandle.ready()),
    /*connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),*/
    allUsers: Meteor.users.find({}).fetch(),

  };

}, AdminLayout);
