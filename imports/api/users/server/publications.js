import { Meteor } from 'meteor/meteor';

let DEBUG = true;
let LOG_TAG = "imports/api/users/server/publications";

Meteor.publish( 'users', function() {
    let isAdmin = Roles.userIsInRole( this.userId, 'admin' );
    if (DEBUG) {
        console.log(LOG_TAG,"publish-users this.userId : ",this.userId," >>> isAdmin : ",isAdmin);
    }
    console.log("all",Meteor.users.find(
                {},
                {
                    fields:
                        {
                            "username" : 1,
                            "emails.address": 1,
                            "roles": 1,
                            "profile" : 1,
                            "pedometer" : 1,
                            "myField" : 1,
                            "profilePictureBase64" : 1
                        }
                }
            ).fetch())
    console.log("no admin",Meteor.users.find(
                {roles : {$nin : ["admin"]}},
                {
                    fields:
                        {
                            "username" : 1,
                            "emails.address": 1,
                            "roles": 1,
                            "profile" : 1,
                            "pedometer" : 1,
                            "myField" : 1,
                            "profilePictureBase64" : 1
                        }
                }
            ).fetch());
    if ( isAdmin ) {
        return [
            Meteor.users.find(
                {roles : {$nin : ["admin"]}},
                {
                    fields:
                        {
                            "username" : 1,
                            "emails.address": 1,
                            "roles": 1,
                            "profile" : 1,
                            "pedometer" : 1,
                            "myField" : 1,
                            "profilePictureBase64" : 1
                        }
                }
            )
        ];
    } else {
        return this.ready();
    }
});
