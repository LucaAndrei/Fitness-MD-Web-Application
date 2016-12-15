/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import userdatas from '../userdatas.js';

Meteor.publish('userdatas', function(forUserEmail) {
	console.log("publish userdata forUserEmail", forUserEmail);
	if (forUserId !== undefined) {
		console.log("userdata data",userdatas.find({userEmail : forUserEmail}).fetch());
		return userdatas.find({userEmail : forUserEmail});

	} else {
		return;
	}
});