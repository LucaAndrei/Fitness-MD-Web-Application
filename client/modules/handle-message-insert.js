let _getMessage = ( currentMessage ) => {
  let message = currentMessage.value;
  return message.trim();
};

let _checkIfCanInsert = ( message ) => {
  console.log("_checkIfCanInsert message",message);
  return message !== '';
};

let _buildMessage = ( message, assignedDoctorId ) => {
  console.log("_buildMessage message",message, assignedDoctorId);
  return {
    destination: assignedDoctorId,
    message: message.value
  };
};

let _handleInsert = ( message ) => {
  console.log("_handleInsert",message);
  console.log("Meteor",Meteor);
  Meteor.call( 'insertMessage', message, ( error ) => {
    if ( error ) {
      console.log("error",error);
      alert('error',error.reason);
      //Bert.alert( error.reason, 'danger' );
    } else {
      //event.target.value = '';
    }
  });
};

export default function(message, assignedDoctorId ) {
  console.log("handleMessageInsert",message, assignedDoctorId);
  let text      = _getMessage( message ),
      canInsert = _checkIfCanInsert( text );
  console.log("text",text);
  console.log("canInsert",canInsert);

  if ( canInsert ) {
    _handleInsert( _buildMessage( message, assignedDoctorId ), message );
  }
}