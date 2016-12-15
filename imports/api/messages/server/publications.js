/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import Messages from '../Messages.js';

Meteor.publish('messages', function(assignedDoctorId) {
	if (this.userId != null && this.userId !== undefined && assignedDoctorId !== undefined){
		console.log("assignedDoctorId",assignedDoctorId);
		console.log("this.userId",this.userId);
		let user = Meteor.users.findOne({_id : assignedDoctorId.assignedDoctorId});
		console.log("user",user);
	    return Messages.find({
	      $or: [ { owner: this.userId, to: user._id }, { owner: user._id, to: this.userId } ]
	    });
	} else return;
});