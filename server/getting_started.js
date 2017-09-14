// getting-started.js
var mongoose = require('mongoose');
var jsonfile = require('jsonfile');
var express = require('express');
// const basicAuthMidleWare = require('./basic-auth-middleware');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var crypt = require('apache-crypt');
var multer = require('multer');

var upload = multer();

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

//read data
var file = './revenue_time.json';
var json = JSON.stringify( jsonfile.readFileSync(file) );

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
mongoose.connect('mongodb://root:root@ds133044.mlab.com:33044/graph');
var db = mongoose.connection;
var UserSchema = new mongoose.Schema({
                                   userName: String,
                                   firstName: String,
                                   lastName: String,
                                   password: String,
                                   });

var User = mongoose.model('Graph', UserSchema);

app.post('/sign-up', upload.array(), (req, res)=>{
  var password = req.body.password;
  var encryptedPassword = crypt(password);
  var data = new User();
  data.userName = req.body.username;
  data.firstName = req.body.firstName;
  data.lastName = req.body.lastName;
  data.password = encryptedPassword;
  console.log(data);
  data.save((err, data)=>{
    if(err) return console.log(err);
  });
  console.log(req.body);
  res.json(req.body);
});

app.listen(3000);

console.log("Check if json variable is valid:"+json);
// //mongoose connection
// //get from db
// Graph.find(function (err, data){
//   if (err) return err;
//   console.log(data);
// });
