// getting-started.js
const mongoose = require('mongoose');
const jsonfile = require('jsonfile');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');



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
app.use(bodyParser());

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

app.listen(3000);

console.log("Check if json variable is valid:"+json);
