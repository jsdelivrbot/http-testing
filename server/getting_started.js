// getting-started.js
var mongoose = require('mongoose');
var jsonfile = require('jsonfile');
var express = require('express');

var app = express();
app.use(express.static('public'))
//read data
var file = './revenue_time.json'
var json = JSON.stringify( jsonfile.readFileSync(file) );

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//add route for post unew users
app.get('/file', (req, res)=>{
  res.send(json);
  res.end();
});
// graph query mongoDB database to pull out statistics
// post new Graph object by form-express+angular form
// get specific data to connect to d3 graph


app.listen(3000);

console.log("Check if json variable is valid:"+json);
// //mongoose connection
// mongoose.connect('mongodb://localhost/graph'); //create new graph db in MongoDB
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });
// //declare Schema
// var GraphSchema = mongoose.Schema({time: Number, value: Number});
//
// GraphSchema.methods.identify = function(){
//   var id = this.value ? this.value : "No value specified.";
//   console.log(id);
// };
//
// var Graph = mongoose.model('Graph', GraphSchema);
// var data = new Graph(json);
// //save to db
// data.save(function (err, data){
//   if(err) return console.log(err);
//   data.identify();
// });
// //get from db
// Graph.find(function (err, data){
//   if (err) return err;
//   console.log(data);
// });
