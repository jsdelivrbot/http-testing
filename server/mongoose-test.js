// getting-started.js
var mongoose = require('mongoose');
var jsonfile = require('jsonfile');
var express = require('express');
var multer = require('multer');
// const basicAuthMidleWare = require('./basic-auth-middleware');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var crypt = require('apache-crypt');

var app = express();
var upload = multer();
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));

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
