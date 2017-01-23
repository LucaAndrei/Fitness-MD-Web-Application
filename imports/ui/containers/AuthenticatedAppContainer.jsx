import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import AuthenticatedApp from '../layouts/AuthenticatedApp.jsx';

let DEBUG = true;
let LOG_TAG = "imports/ui/containers/AuthenticatedAppContainer";

export default createContainer(() => {
    const usersHandle = Meteor.subscribe('users');

    if (DEBUG) {
        console.log(LOG_TAG, "createContainer allUsers : ",Meteor.users.find({roles : {$nin : ["admin"]}}).fetch());
    }
    return {
        user: Meteor.user(),
        menuOpen: Session.get('menuOpen'),
        loading: !(usersHandle.ready()),
        allUsers: Meteor.users.find({roles : {$nin : ["admin"]}}).fetch()
    };
}, AuthenticatedApp);