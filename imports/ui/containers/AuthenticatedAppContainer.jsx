import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import AuthenticatedApp from '../layouts/AuthenticatedApp.jsx';

let DEBUG = true;
let LOG_TAG = "imports/ui/containers/AuthenticatedApp";

export default createContainer(() => {
    const usersHandle = Meteor.subscribe('users');

    if (DEBUG) {
        console.log(LOG_TAG, "createContainer allUsers : ",Meteor.users.find({}).fetch());
    }
    return {
        user: Meteor.user(),
        menuOpen: Session.get('menuOpen'),
        loading: !(usersHandle.ready()),
        allUsers: Meteor.users.find({}).fetch()
    };
}, AuthenticatedApp);