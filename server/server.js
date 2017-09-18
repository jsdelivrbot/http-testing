// getting-started.js
const mongoose = require('mongoose');
const jsonfile = require('jsonfile');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
var crypt = require('apache-crypt');
var multer = require('multer');
var UserSchema = require('./user-schema');

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


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get('/file', (req, res)=>{
  res.send(json);
  res.end();
});

app.get('/isLoggedIn', (req, res)=>{
    res.json({ok: true});
    // res.end();
});

app.post('/logOut', (req, res)=>{
  delete req.session.authenticated;
  res.sendStatus(204);
});

app.post('/logIn', (req, res)=>{
  if( req.body.username &&
      req.body.username === 'root' &&
      req.body.password &&
      req.body.password === 'root'
  ){
    req.session.authenticated = true;
    res.json({ok: true});
  }else{
    res.json({ok: false});
  }
});
var connStr = 'mongodb://root:root@ds133044.mlab.com:33044/graph';
mongoose.connect(connStr);
var db = mongoose.connection;
var UserSchema = new mongoose.Schema({
                                   userName: String,
                                   firstName: String,
                                   lastName: String,
                                   password: String,
                                   });

var User = mongoose.model('Graph', UserSchema);

app.post('/signup', upload.array(), (req, res)=>{
  console.log(req.body.parameter.password);
  var password = req.body.parameter.password;
  var encryptedPassword = crypt(password);
  var data = new User();
  data.userName = req.body.parameter.username;
  data.firstName = req.body.parameter.firstName;
  data.lastName = req.body.parameter.lastName;
  data.password = encryptedPassword;
  console.log(data);
  data.save((err, data)=>{
    if(err) return console.log(err);
  });
  console.log(req.body);
  res.json(req.body);
});

var DataSchema = new mongoose.Schema({
                                   letter: String,
                                   frequency: Number
                                   });
var DataModel = mongoose.model('GraphData', DataSchema);

app.post('/postdata', (req, res)=>{

});

app.listen(3000);

console.log("Check if json variable is valid:"+json);
