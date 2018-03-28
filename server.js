//packages that we need

//to use express
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

//mongoose
var Bear = require('./app/models/bear');

//configuring the app to use bodyParser
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT ||8080;


//routes for API
var router = express.Router(); //get an instance of the express router

router.get('/', function(req, res){
  res.json({ message: 'Hooray! welcome to the api'});
});

//Regiser our routes
//all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);


//setting up to use with mongoose
var mongoose = require ('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
