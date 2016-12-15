import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import userdatas from '../../api/userdata/userdatas.js';
import UserProfile from '../pages/UserProfile.jsx';


export default createContainer(({ params: { userId } }) => {
  //const publicHandle = Meteor.subscribe('lists.public');
  //const privateHandle = Meteor.subscribe('lists.private');
  console.log("userId",userId);

  const userdataHandle = Meteor.subscribe('userdatas',{userId});
  console.log("UserProfileContainer userdataHandle",userdataHandle);
  return {
    user: Meteor.user(),
    loading: !(userdataHandle.ready()),
    /*connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),*/
    userdata: userdatas.find({}).fetch()
  };
}, UserProfile);
