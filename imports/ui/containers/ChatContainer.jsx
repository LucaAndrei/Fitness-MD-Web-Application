import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import  Messages  from '../../api/messages/Messages.js';
import DoctorChat from '../pages/DoctorChat.jsx';


export default createContainer(({ params: { assignedDoctorId } }) => {
  //const publicHandle = Meteor.subscribe('lists.public');
  //const privateHandle = Meteor.subscribe('lists.private');
  console.log("assignedDoctorId",assignedDoctorId);

  const messagesHandle = Meteor.subscribe('messages',{assignedDoctorId});
  console.log("ChatContainer messagesHandle",messagesHandle);
  console.log("createContainer",Meteor);
  console.log("messages",Messages);
  console.log("Meteor.user",Meteor.user());
  return {
    user: Meteor.user(),
    loading: !(messagesHandle.ready()),
    /*connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),*/
    messages: Messages.find({}, { sort: { timestamp: 1 } } ).fetch()
  };
}, DoctorChat);
