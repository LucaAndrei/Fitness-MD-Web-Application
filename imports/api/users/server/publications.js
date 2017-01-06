import { Meteor } from 'meteor/meteor';

let DEBUG = true;
let LOG_TAG = "imports/api/users/server/publications";

Meteor.publish( 'users', function() {
    let isAdmin = Roles.userIsInRole( this.userId, 'admin' );
    if (DEBUG) {
        console.log(LOG_TAG,"publish-users this.userId : ",this.userId," >>> isAdmin : ",isAdmin);
    }
    if ( isAdmin ) {
        return [
            Meteor.users.find(
                {},
                {
                    fields:
                        {
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
