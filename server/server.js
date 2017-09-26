// getting-started.js
const mongoose = require('mongoose');
const jsonfile = require('jsonfile');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
// var crypt = require('apache-crypt');
var multer = require('multer');
var User = require('./user-schema');

var upload = multer();

const app = express();
app.use(express.static('public'));
//read data
const file = './revenue_time.json'
const json = JSON.stringify( jsonfile.readFileSync(file) );

function checkAuth(req, res, next){
  console.log('checkAuth' + req.url);
  console.log(req.session, req.session.authenticated);
  if( req.url === '/bar-chart' && ( !req.session || !req.session.authenticated )){
    res.sendStatus(403);
    return;
  }
  next();
};

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(cookieParser());
app.use(cookieSession({secret: 'secret'}));
app.use(bodyParser({extended: false}));

app.use(checkAuth);


  var connStr = 'mongodb://root:root@ds133044.mlab.com:33044/graph';
  mongoose.connect(connStr, function(err) {
      if (err) throw err;
      console.log('Successfully connected to MongoDB');
  });

app.get('/file', (req, res)=>{
  res.send(json);
  res.end();
});

app.get('/isLoggedIn', (req, res)=>{
    res.json({ok: req.session.authenticated});
    // res.end();
});

app.post('/logOut', (req, res)=>{
  delete req.session.authenticated;
  res.sendStatus(204);
});
app.post('/logIn', (req, res)=>{
  //save signed in user in req.session
  myPassword = req.body.password;
  myUser = req.body.username;
  User.find({ username: myUser }, function(err, user){
    if (err) return console.log('Error looking up username');
    console.log(user.password);

// User.findOne({ username: req.body.username }, function(err, user){
//   if (err) return console.log('Error looking up username');
//   if(user){
//     console.log(user);
//     hashed = bcrypt.hashSync( myPassword, 10 );
//     console.log( hashed );
//       bcrypt.compare(myPassword, user.password, function(err, isMatch){
//         if (err) return console.log('Error looking password');
//         if (isMatch){
//           console.log('Authenticatation successs');
//           req.session.authenticated = true;
//           res.json({ok: true});
//         } else{
//           console.log('Authentication fail');
//           res.json({ok: false});
//         }
//       });
// }else {
//   res.json({ok: false});
// }
  //
  });

});

app.post('/signup', upload.array(), (req, res)=>{
  // create a user a new user
  var user = new User();
  user.username = req.body.parameter.userName;
  user.firstName = req.body.parameter.firstName;
  user.lastName = req.body.parameter.lastName;
  user.password = req.body.parameter.password;
  console.log(user);
  user.save((err, user)=>{
    if(err) return console.log(err, 'Server problems or probably user is already registered');
  });
});
//
// var DataSchema = new Schema({
//                               all: [{
//                               ref_username: String, //references user name
//                               time: String,
//                               count: Number,
//                               date: { type: Date,
//                                             default: Date.now}
//                                }]
//                              },
//                                 { collection: 'data' });
// var Data = mongoose.model('Data', DataSchema);
//
// app.post('/postData', (req, res)=>{ //not tested
//   // instantiate
//   var data = new Data();
//   // save parameters from req body
//   //initial version: post from manual form input
//   //recieve array of type [ {ref_username : '', time: '', count: Integer },{...} ] of any size and add to db
//  var array = req.body.array;
//  for(i=0; i < array.length; i++){
//    data.row[i].ref_username = req.body.parameter[i].ref_username;
//    data.row[i].time = req.body.parameter[i].time;
//    data.row[i].count = req.body.parameter[i].count;
//  }
//
//   console.log(data);
//     //  save data to db
//     data.save(function(err, x){
//       if (err) console.log(err);
//       //get all users data
//       Data.find({ ref_username: req.body.parameter[0].ref_username }, function (err, docs) {
//         if (err) console.error(err.stack||err);
//         console.log('found :', docs);
//       });
//     });
// });
//
//
// });

app.listen(3000);
console.log("Check if json variable is valid:"+json);
