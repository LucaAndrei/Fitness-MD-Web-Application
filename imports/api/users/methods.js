import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

let DEBUG = true;
let LOG_TAG = "imports/api/users/methods";

export const assignDoctor = new ValidatedMethod({
    name : 'assignDoctor',
    validate : new SimpleSchema({
        userId: { type: String, regEx: SimpleSchema.RegEx.Id},
        doctorId: { type: String, regEx: SimpleSchema.RegEx.Id},
        shouldAssign : {type : Boolean}
    }).validator(),
    run({userId, doctorId, shouldAssign}) {
        if (DEBUG) {
            console.log(LOG_TAG,"assignDoctor userId : ",userId, " >>> doctorId : ",doctorId, " >>> shouldAssign : ", shouldAssign);
        }
        let result;
        if(shouldAssign) {
            result = Meteor.users.update(userId, {
                $set : {
                    "profile.assignedDoctorId" : doctorId
                }
            });
        } else {
            result = Meteor.users.update(userId, {
                $unset : {
                    "profile.assignedDoctorId" : ""
                }
            });
        }
        if (DEBUG) {
            console.log(LOG_TAG,"assignDoctor result : ",result);
        }
    }
})

export const insertPedometerData = new ValidatedMethod({
    name : 'insertPedometerData',
    validate : new SimpleSchema({
        userIdToInsert: {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        steps : {
            type : Number
        },
        'date' : {
            type : Number
        },
        'kCalBurned' : {
            type : Number
        },
        'timeActive' : {
            type : Number
        }
    }).validator(),
    run({userIdToInsert,steps,date,kCalBurned, timeActive}) {
        if (DEBUG) {
            console.log(LOG_TAG,"insertPedometerData userIdToInsert : ",userIdToInsert, " >>> steps : ",steps, " >>> date : ", date, " >>> kCalBurned : ", kCalBurned , " >>> timeActive : ", timeActive);
        }

        var result = Meteor.users.update(
            {_id : userIdToInsert},
            { $push :
                {'pedometer' :
                    {
                        steps : steps,
                        date : date,
                        kCalBurned : kCalBurned,
                        timeActive : timeActive
                    }
                }
            });
        if (DEBUG) {
            console.log(LOG_TAG,"insertPedometerData result : ",result);
        }
    }
})


export const insertProfilePicture = new ValidatedMethod({
    name : 'insertProfilePicture',
    validate : new SimpleSchema({
        userIdToInsert: {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        },
        base64String: {
            type: String,
        }
    }).validator(),
    run({userIdToInsert,base64String}) {
        if (DEBUG) {
            console.log(LOG_TAG,"insertProfilePicture base64String : ");//,base64String);
        }


        var result = Meteor.users.upsert(
            {_id : userIdToInsert},
            { $set :
                {'profilePictureBase64' : base64String }
            });
        if (DEBUG) {
            console.log(LOG_TAG,"insertPedometerData result : ",result);
        }
    }
})