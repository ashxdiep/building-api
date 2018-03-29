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

//declaring the middleware
router.use(function(req, res, next){
  //do logging
  console.log('Something is happening.');
  next(); //make sure we go to the next routes and don't stop here
})

router.get('/', function(req, res){
  res.json({ message: 'Hooray! welcome to the api'});
});


router.route('/bears')

  //creating a Bear
  .post(function(req, res){
    var bear = new Bear(); //new instance of bear model
    bear.name = req.body.name; //set bears name
    bear.save(function(err){
      if (err){
        res.send(err);
      }

      res.json({message:'Bear created.'});
    });
  })

  //getting all the BearS
  .get(function(req, res){
    Bear.find(function(err, bears){
      if (err){
        res.send(err);
      }
      res.json(bears);
    });
  });

  //getting specific bear
  router.route('/bears/:bear_id')

    .get(function(req,res){
      Bear.findById(req.params.bear_id, function (err, bear){
        if (err){
          res.send(err);
        }
        res.json(bear);
      });
    });






//Regiser our routes
//all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);


//setting up to use with mongoose
var mongoose = require ('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
