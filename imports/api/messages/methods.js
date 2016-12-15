import { Meteor } from 'meteor/meteor';
//import { ValidatedMethod } from 'meteor/mdg:validated-method';
//import { SimpleSchema } from 'meteor/aldeed:simple-schema';


/*
export const insertMessage = new ValidatedMethod({
  name: 'insertMessage',
  validate: new SimpleSchema({
    to: {
      type: String,
    },
    owner: {
      type: String,
    },
    timestamp: {
      type: Date,
    },
    message: {
      type: String,
    },
  }).validator(),
  run({ to, owner, timestamp, message }) {
    console.log(to,owner,timestamp,message);
    insertMessage
    //return Lists.insert({}, null, locale);
  },
});*/

Meteor.methods({
  insertMessage( message ) {
    console.log("message",message);
    /*check( message, {
      destination: String,
      message: String
    });*/

    try {
      handleInsert( message );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});


let _insertMessage = ( message ) => {
  console.log("_insertMessage message",message)
  return Messages.insert( message );
};

let _escapeUnwantedMarkdown = ( message ) => {
  // Escape h1-h6 tags and inline images ![]() in Markdown.
  return message
  .replace( /#/g, '&#35;' )
  .replace( /(!\[.*?\]\()(.*?)(\))+/g, '&#33;&#91;&#93;&#40;&#41;' );
};

let _cleanUpMessageBeforeInsert = ( message ) => {
  console.log("_cleanUpMessageBeforeInsert message",message)
  delete message.destination;
  message.message = _escapeUnwantedMarkdown( message.message );
  console.log("_cleanUpMessageBeforeInsert message 123",message)
};

let _getChannelId = ( channelName ) => {
  let channel = Channels.findOne( { name: channelName } );
  if ( channel ) {
    return channel._id;
  }
};

let _getUserId = ( username ) => {
  let user = Meteor.users.findOne( { _id: username } );
  console.log("_getUserId",user);
  if ( user ) {
    return user._id;
  }
};

let _getUserName = ( username ) => {
  let user = Meteor.users.findOne( { _id: username } );
  console.log("_getUserId",user);
  if ( user ) {
    return user.emails[0].address;
  }
};

let _assignDestination = ( message ) => {
  console.log("_assignDestination message",message)
    message.to = _getUserId( message.destination );
    message.toName = _getUserName(message.destination);
  console.log("_assignDestination message after",message)
};

let _checkIfSelf = ( { destination, owner } ) => {
  return destination === owner;
};

let _assignOwnerAndTimestamp = ( message ) => {
  message.owner     = Meteor.userId();
  message.ownerName = Meteor.user().emails[0].address;
  message.timestamp = new Date();
  console.log(message);
};

function handleInsert( message ) {
  console.log("insert message",message);
  _assignOwnerAndTimestamp( message );

  if ( !_checkIfSelf( message ) ) {
    console.log("not self");
    _assignDestination( message );
    _cleanUpMessageBeforeInsert( message );
    _insertMessage( message );
  } else {
    console.log("sending messages to self");
    throw new Meteor.Error( '500', 'Can\'t send messages to yourself.' );
  }
}