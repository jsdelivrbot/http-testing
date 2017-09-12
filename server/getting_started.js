// getting-started.js
var mongoose = require('mongoose');
var jsonfile = require('jsonfile');
var express = require('express');
const basicAuthMidleWare = require('./basic-auth-middleware')
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var crypt = require('apache-crypt');

var app = express();
app.use(express.static('public'));
app.use(express.bodyParser());

//read data
var file = './revenue_time.json';
var json = JSON.stringify( jsonfile.readFileSync(file) );

mongoose.connect('mongodb://root:root@ds133044.mlab.com:33044/graph');
var db = mongoose.connection;
var UserSchema = mongoose.Schema({ userName: String,
                                   firstName: String,
                                   lastName: String,
                                   password: String,
                                   education: String,
                                   dataType: String});

var User = mongoose.model('Graph', UserSchema);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// add route for post unew users
app.get('/file', (req, res)=>{
  res.send(json);
  res.end();
});
app.post('/signup', (req, res)=>{
  var password = req.body.password
  var encryptedPassword = crypt(password);
  //get username and password from header
  //get user password from db
  //save to db
  var data = new User(req.body.userName, req.body.firstName, req.body.lastName, encryptedPassword, req.body.education, req.body.dataType);
  data.save(function (err, data){
    if(err) return console.log(err);
    data.identify();
  });

});

app.listen(3000);

console.log("Check if json variable is valid:"+json);
// //mongoose connection
// //get from db
// Graph.find(function (err, data){
//   if (err) return err;
//   console.log(data);
// });
