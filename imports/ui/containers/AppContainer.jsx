import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import  Messages  from '../../api/messages/Messages.js';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  //const publicHandle = Meteor.subscribe('lists.public');
  //const privateHandle = Meteor.subscribe('lists.private');
  //console.log("assignedDoctorId",assignedDoctorId);

  //const messagesHandle = Meteor.subscribe('messages',{assignedDoctorId});
  //console.log("AppContainer messagesHandle",messagesHandle);
  //console.log("createContainer",Meteor);
  //console.log("messages",Messages);
  const usersHandle = Meteor.subscribe('users');
  console.log("AppContainer Meteor.user",Meteor.user());
  console.log("AppContainer All users",Meteor.users.find({}).fetch());
  return {
    user: Meteor.user(),
    //loading: !(messagesHandle.ready()),
    /*connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),*/
    //messages: Messages.find({}, { sort: { timestamp: 1 } } ).fetch()
    allUsers: Meteor.users.find({}).fetch(),
  };
}, App);
