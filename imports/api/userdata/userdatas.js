userdatas = new Mongo.Collection( 'userdatas' );

userdatas.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

userdatas.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let PedometerDataSchema = new SimpleSchema({
    'steps' : {
        type : Number
    },
    'date' : {
        type : Date
    },
    'kCalBurned' : {
        type : Number
    },
    'timeActive' : {
        type : Number
    }
})

let WeightDataSchema = new SimpleSchema({
    'measuredKg' : {
        type : Number
    },
    'dateOfMeasurement' : {
        type : Date
    }
})

let UserDataSchema = new SimpleSchema({
    'userEmail' : {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
    },
    'pedometerData' : {
        type : [PedometerDataSchema],
        minCount : 1
    },
    'weightData' : {
        type : [WeightDataSchema],
        minCount : 1
    },
    'weightGoal' : {
        type : Number
    },
    'lastMeasurement' : {
        type : Date
    }
});

userdatas.attachSchema( UserDataSchema );

export default userdatas;