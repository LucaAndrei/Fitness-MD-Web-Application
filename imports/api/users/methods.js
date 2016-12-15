import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';



export const assignDoctor = new ValidatedMethod({
  name : 'assignDoctor',
  validate : new SimpleSchema({
      userId: { type: String, regEx: SimpleSchema.RegEx.Id},
      doctorId: { type: String, regEx: SimpleSchema.RegEx.Id},
      shouldAssign : {type : Boolean}
  }).validator(),
  run({userId, doctorId, shouldAssign}) {
    console.log("userId",userId);
    console.log("doctorId",doctorId);
    console.log("shouldAssign",shouldAssign);
    console.log("meteor.users",Meteor.users);
    if(shouldAssign) {
      Meteor.users.update(userId, {
        $set : {
          "profile.assignedDoctorId" : doctorId
        }
      });
    } else {
      Meteor.users.update(userId, {
        $unset : {
          "profile.assignedDoctorId" : ""
        }
      });
    }

  }
})

export const findUserById = new ValidatedMethod({
  name : 'findUserById',
  validate : new SimpleSchema({
      userIdToFind: { type: String, regEx: SimpleSchema.RegEx.Id}
  }).validator(),
  run({userIdToFind}) {
    console.log("userIdToFind",userIdToFind);
    var user = Meteor.users.findOne({_id : userIdToFind});
    console.log("user",user.emails[0].address);
    return user.emails[0].address;
  }
})

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