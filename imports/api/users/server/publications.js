import { Meteor } from 'meteor/meteor';

Meteor.publish( 'users', function() {
	console.log("publish users.current user id ",this.userId);
  let isAdmin = Roles.userIsInRole( this.userId, 'admin' );
  console.log("isAdmin",isAdmin)
  if ( isAdmin ) {
    console.log("all users",Meteor.users.find( {}, { fields: { "emails.address": 1, "roles": 1 } } ).fetch())
    return [
      Meteor.users.find( {}, { fields: { "emails.address": 1, "roles": 1, "profile" : 1 } } )
    ];
  } else {
    return null;
  }
});


Meteor.publish( 'my.users', function() {
  console.log("publish users.current user id ",this.userId);
  let isAdmin = Roles.userIsInRole( this.userId, 'admin' );
  console.log("isAdmin",isAdmin)
  if ( isAdmin ) {
    console.log("my.users",Meteor.users.find({'profile.assignedDoctorId' : this.userId}, { fields: { "emails.address": 1, "roles": 1 } } ).fetch())
    return [
      Meteor.users.find({'profile.assignedDoctorId' : this.userId}, { fields: { "emails.address": 1, "roles": 1 } } )
    ];
  } else {
    return null;
  }
});

