var express = require('express');
const { append } = require('express/lib/response');
var router = express.Router();
var mongoose = require('mongoose');


//-var MongoClient = require('mongodb').MongoClient;
//-var url = "mongodb+srv://Madremia-15:Madremia-15@cluster0.xupcv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

router.get('/', function(req, res, next) {
  res.render('mongo');
});

mongoose.connect('mongodb+srv://Madremia-15:Madremia-15@cluster0.xupcv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  () => console.log("connected to mongo")
);

 var Schema = mongoose.Schema,
   ObjectID = Schema.ObjectID;

var Person = new mongoose.Schema({
   name: String,
   dogname: String,
   service: String,
   date: String,
   time: String
})

var Person = mongoose.model('Person', Person);

router.get('/', function(req, res){
  Person.find({}, function(err, docs){
    res.render('mongo', { Person: docs});
  })
})
// var PostSchema = mongoose.Schema({
//   name: String,
//   dogname: String,
//   service: String,
//   date: String,
//   time: String
// })

// Get data
// router.get('/', async(req, res) =>{
//   try{
//     var post = await post.find();
//     res.json(post);
//   } catch (err){
//     res.json({message: err});
//   }
// })

module.exports = router;