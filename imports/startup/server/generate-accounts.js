Meteor.startup(() => {


	let administrators = [
	  {
	    name: { first: 'Admin', last: 'McAdmin' },
	    email: 'admin@admin.com',
	    password: 'password'
	  }
	];

	let generateAccounts = () => {
	  console.log("generateAccounts");
	  let fakeUserCount = 1,
	      usersExist    = _checkIfAccountsExist( administrators.length + fakeUserCount );

	  //if ( !usersExist ) {
	    //_createUsers( administrators );
	    //_createUsers( _generateFakeUsers( fakeUserCount ) );
	  //}
	  //console.log(usersExist)
	};

	let _checkIfAccountsExist = ( count ) => {
	  let userCount = Meteor.users.find().count();
	  return userCount <count ? false : true;
	};

	let _createUsers = ( users ) => {
	  for ( let i = 0; i <users.length; i++ ) {
	    let user       = users[ i ],
	        userExists = _checkIfUserExists( user.email );

	    if ( !userExists ) {
	      let userId  = _createUser( user ),
	          isAdmin = _checkIfAdmin( user.email );

	      if ( isAdmin ) {
	        Roles.setUserRoles( userId, 'admin' );
	      } else {
	        Roles.setUserRoles( userId, 'employee' );
	      }
	    }
	    //console.log("_createUsers user",user);
	  }
	};

	let _checkIfUserExists = ( email ) => {
	  return Meteor.users.findOne( { 'emails.address': email } );
	};

	let _createUser = ( user ) => {
	  let userId = Accounts.createUser({
	    email: user.email,
	    password: user.password,
	    profile: {
	      name: user.name
	    }
	  });
	  //console.log("email",user);
	  //console.log("createUser",userId);

	  return userId;
	};

	let _checkIfAdmin = ( email ) => {
	  return _.find( administrators, ( admin ) => {
	    return admin.email === email;
	  });
	};
	const admins = [
	  { "email": "admin@admin.com" }
	];

	let _generateFakeUsers = ( count ) => {
	  let users = [];
	  var admin   = Meteor.users.findOne( { "emails.address": admins[0].email }, { fields: { "_id": 1 } } );
	  for ( let i = 0; i <count; i++ ) {
	    users.push({
	      name: { first: faker.name.firstName(), last: faker.name.lastName() },
	      email: faker.internet.email(),
	      password: 'password',
	      assignedDoctorId : admin._id
	    });
	  }


	  return users;
	};

	generateAccounts();



	let setAdmins = () => {
		//console.log("setAdmins");
	  for ( let i = 0; i <admins.length; i++ ) {
	    var admin   = Meteor.users.findOne( { "emails.address": admins[i].email }, { fields: { "_id": 1 } } );
	        isAdmin = _isUserAnAdmin( admin._id );

	    if ( !isAdmin ) {
	      Roles.setUserRoles( admin._id, 'admin' );
	    }
	  }
	};

	let _isUserAnAdmin = ( userId ) => {
	  return Roles.userIsInRole( userId, 'admin' );
	};

	setAdmins();

	//console.log(Meteor.users.find({}).fetch());



})


