import _ from 'lodash';

if(Meteor.isServer) {
	console.log("Meteor is server");
	Accounts.onCreateUser((options, user) => {
		console.log("onCreateUser",options);
		console.log("onCreateUser user",user);
	  	// add your extra fields here; don't forget to validate the options, if needed
	 	user.profile = options.profile || {};
	  	_.extend(user, {
		    status: false,
		    createdAt: new Date(),
		    myField : [1,2,3]
	 	});

	  	console.log("modified user",user);

	  	return user;
	});
}
