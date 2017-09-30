// getting-started.js
const mongoose = require('mongoose');
const jsonfile = require('jsonfile');
const Schema = mongoose.Schema;
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
  if( (req.url === '/bar-chart' || req.url === '/post-data') && ( !req.session || !req.session.authenticated )){
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
  mongoose.connect(connStr, { useMongoClient: true, promiseLibrary: global.Promise }, function(err) {
      if (err) throw err;
      console.log('Successfully connected to MongoDB');
  });

app.get('/file', (req, res)=>{
  res.send(json);
  res.end();
});

app.get('/isLoggedIn', (req, res)=>{
    res.json({ok: req.session.authenticated ? true : false});
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
  User.find({
    username: myUser
  }).exec()
  .then(([user])=>{
    console.log('Found user in db')
    console.log(myPassword +" "+ user.password )
    if(bcrypt.compare(myPassword, user.password)) {
      req.session.authenticated = true;
      req.session.username = myUser;
      console.log('Passwords match');
      res.json({ ok: true });
    } else{
      console.log("Passwords don't match");
      res.json({ ok: false });
    }
  }).catch((err)=>{
    res.json({ ok: false });
    console.log("Error occured");

  });
});

app.post('/signup', upload.array(), (req, res)=>{
  const saltRounds = 10;
  // create a user a new user
  var user = new User();
  user.username = req.body.parameter.userName;
  user.firstName = req.body.parameter.firstName;
  user.lastName = req.body.parameter.lastName;
  user.password = req.body.parameter.password;

  bcrypt.hash(req.body.parameter.password, saltRounds, function(err, hash) {
    user.password = hash;
    user.save((err, user)=>{
      if(err) return console.log(err, 'Server problems or probably user is already registered');
      console.log('Sign up occured'+user );
    });
  });

});

var DataSchema = new Schema({ ref_username: String,
                              all: [{
                              time: String,
                              count: String,
                              date: { type: Date,
                                      default: Date.now}
                               }]
                             },
                                { collection: 'data' });
var Data = mongoose.model('Data', DataSchema);

app.post('/postData', (req, res)=>{ //not tested
var data = new Data();
  // save parameters from req body
  //recieve array of type {"values": [{"time": "Friday", "count": 15},{"time": "Friday", "count": 15 }]}
var array = JSON.parse(req.body.array);
 data.ref_username = req.body.username; //res.session.username
 data.all.push(...array.values);
     //  save data to db
 data.save(function(err, data){
      if (err) console.log(err);
      //get all users data
      console.log( data );
      if ( data ){
        res.json( { post: true });
        res.end();
      }else{
        res.json( { post: false });
        res.end();
      }

  });

// using the promise returned from executing a query
var query = User.find({ ref_username: req.body.username });
var promise = query.exec();
promise.addBack(function (err, docs) {console.log('success')});
});

app.listen(3000);
console.log("Check if json variable is valid:"+json);
