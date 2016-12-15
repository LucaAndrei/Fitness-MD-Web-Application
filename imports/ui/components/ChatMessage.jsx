import React from 'react';

import {findUserById} from '../../api/users/methods.js'

export default class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  createTimestamp(timestamp) {
    //console.log("timestamp",timestamp);
    if ( timestamp ) {
      let today         = moment().format( 'YYYY-MM-DD' ),
          datestamp     = moment( timestamp ).format( 'YYYY-MM-DD' ),
          isBeforeToday = moment( today ).isAfter( datestamp ),
          format        = isBeforeToday ? 'MMMM Do, YYYY hh:mm a' : 'hh:mm a';
      var formattedTimestamp =  moment( timestamp ).format( format );
    }
    //console.log("formattedTimestamp",formattedTimestamp);
    return formattedTimestamp;
  }

  displayName(messageOwnerId) {
    //console.log("messageOwnerId",messageOwnerId);
    var messageOwnerName;
    findUserById.call({userIdToFind : messageOwnerId }, function(error,result) {
        console.log("error",error);
        console.log("result",result);
        messageOwnerName = result;
    });
    //console.log("messageOwnerName",messageOwnerName);
    return messageOwnerName;
  }

  render() {
    console.log("ChatMessage",this.props);
    const {message} = this.props;
    return (
    	<div className="message">

      <header>
        <h4>{message.ownerName} <span>{this.createTimestamp(message.timestamp)}</span></h4>
      </header>

    <div className="body">
      {message.message}
    </div>
  </div>)

  }
}

