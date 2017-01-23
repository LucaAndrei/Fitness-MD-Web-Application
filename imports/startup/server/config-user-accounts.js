import _ from 'lodash';

if(Meteor.isServer) {
	let LOG_TAG = "config-user-accounts";
	console.log(LOG_TAG,"Meteor is server");
	Accounts.onCreateUser((options, user) => {
		console.log(LOG_TAG,"onCreateUser",options);
		console.log(LOG_TAG,"onCreateUser user",user);
	  	// add your extra fields here; don't forget to validate the options, if needed
	 	user.profile = options.profile || {};
	  	_.extend(user, {
		    status: false,
		    createdAt: new Date(),
		    myField : [1,2,3]
	 	});

	  	console.log(LOG_TAG,"modified user",user);

	  	return user;
	});
}
