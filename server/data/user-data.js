var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    csv = require("fast-csv"),
    // cors = require('cors'),
    express = require('express');

//csv to mongodb

// csv.fromPath('./test.csv',{headers: true})
//     .on("data", function(data){
//        var details = new Details;
//        details=data;
//        details.save(function (saveErr, savedetail) {
//              if (saveErr) {
//                    console.log(saveErr)
//              }
//         });
//     })
//     .on("end", function(){
//         console.log("done");
//     })


  var connStr = 'mongodb://root:root@ds133044.mlab.com:33044/graph';
  mongoose.connect(connStr, function(err) {
      if (err) throw err;
      console.log('Successfully connected to MongoDB');
  });

//finish querying for data for each user
// figure out how to append data to list

var UserSchema = new Schema({
                              username: {type: String, required: true, index:{ unique: true }, ref: 'DataSchema'} ,
                              password: { type: String, required: true },
                              firstName: { type: String, required: true },
                              lastName: { type: String, required: true },
                              loginAttempts: { type: Number, required: true, default: 0 },
                              lockUntil: { type: Number } //timestamp when possible to ignore login attempts
                            },
                            { collection: 'users' });

var DataSchema = new Schema({
                              all: [{
                              ref_username: String, //references user name
                              time: String,
                              count: Number,
                              date: { type: Date,
                                            default: Date.now}
                               }]
                             },
                                { collection: 'data' });

var User = mongoose.model('User', UserSchema);
var Data = mongoose.model('Data', DataSchema);

const  myUsername = 'Jonathan'

mongoose.connection.on('open', function () {
  //create new user
  var user = new User({ username: myUsername ,
                        password: '123',
                        firstName: 'John',
                        lastName: 'Anastasia',
                        loginAttempts: 1,
                        lockUntil: 0 });
  //save user
  user.save(function (err, a) {
    if (err) return console.error(err.stack||err);
    //save user data
    User.find({ username: myUsername }, function (err, docs) {
      if (err) console.error(err.stack||err);
      console.log('found', docs);

    });
  });
});

    //go to connection
mongoose.connection.on('open', function () {
      //choose some username

      var data = new Data({ all :  [ { ref_username: myUsername,
                                       time: '12/03/12',
                                       count: 10,
                                     },
                                      { ref_username: myUsername,
                                        time: '09/04/17',
                                        count: 23,
                                           }  ] });
    //  save data to db
    data.save(function(err, x){
      if (err) console.log(err);
      //get all users data
      Data.find({ ref_username: myUsername }, function (err, docs) {
        if (err) console.error(err.stack||err);
        console.log('found 2:', docs);

      });
    });
});
// var cursor = db.collection('inventory').find({
//   dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } }
// });
