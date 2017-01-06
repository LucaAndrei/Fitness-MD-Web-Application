import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

let DEBUG = true;
let LOG_TAG = "imports/api/messages/methods";


export const insertMessage = new ValidatedMethod({
    name : 'insertMessage',
    validate : new SimpleSchema({
        destination : { type: String },
        message : {type : String}
    }).validator(),
    run({destination, message}) {
        console.log("destination",destination);
        console.log("message",message);
        const messageToInsert = {
            destination,
            message
        }
        console.log("messageToInsert",messageToInsert);
        try {
            handleInsert( messageToInsert );
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    }
})

let _insertMessage = ( message ) => {
    if (DEBUG) {
        console.log("Step 4) _insertMessage message",message)
    }
    var inserted =  Messages.insert( message );
    console.log("inserted",inserted);
    return inserted;
};


let _cleanUpMessageBeforeInsert = ( message ) => {
    delete message.destination;
    if (DEBUG) {
       console.log(LOG_TAG,"Step 3) _cleanUpMessageBeforeInsert message : ",message);
    }
};

let _getUserId = ( username ) => {
    let user = Meteor.users.findOne( { _id: username } );
    if ( user ) {
        return user._id;
    }
};

let _getUserName = ( username ) => {
    let user = Meteor.users.findOne( { _id: username } );
    if ( user ) {
        return user.emails[0].address;
    }
};

let _assignDestination = ( message ) => {
    message.to = _getUserId( message.destination );
    message.toName = _getUserName(message.destination);
    if (DEBUG) {
       console.log(LOG_TAG,"Step 2) _assignDestination message : ",message);
    }
};

let _checkIfSelf = ( message ) => {
    console.log("message",message)
    return message.destination === message.owner;
};

let _assignOwnerAndTimestamp = ( message ) => {
    message.owner     = Meteor.userId();
    message.ownerName = Meteor.user().emails[0].address;
    message.timestamp = new Date();
    if (DEBUG) {
       console.log(LOG_TAG,"Step 1) _assignOwnerAndTimestamp message : ",message);
    }
};

function handleInsert( message ) {
    if (DEBUG) {
       console.log(LOG_TAG,"handleInsert message : ",message);
    }
    _assignOwnerAndTimestamp( message );
    if ( !(_checkIfSelf( message )) ) {
        _assignDestination( message );
        _cleanUpMessageBeforeInsert( message );
        _insertMessage( message );
    } else {
        if (DEBUG) {
            console.log(LOG_TAG,"ERROR. SENDING MESSAGE TO SELF IS NOT ALLOWED");
        }
        throw new Meteor.Error( '500', 'Can\'t send messages to yourself.' );
    }
}


export const insertContactMessage = new ValidatedMethod({
    name : 'insertContactMessage',
    validate : new SimpleSchema({
        name : { type: String },
        email : {type : String},
        message : {type : String}
    }).validator(),
    run({name, email, message}) {
        console.log("name",name);
        console.log("email",email);
        console.log("message",message);
        const messageToInsert = {
            name,
            email,
            message
        }
        console.log("contact messageToInsert",messageToInsert);
        try {
            var inserted =  ContactMessages.insert( message );
            console.log("inserted contact message",inserted);
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    }
})