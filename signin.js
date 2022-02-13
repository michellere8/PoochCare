var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Madremia-15:Madremia-15@cluster0.xupcv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var ssn;


router.get('/', function(req, res, next) {
  ssn = req.session;
  res.render('signin', {error: ssn.profileError});
});

router.post('/', function(req, res, next){
  ssn = req.session;
  ssn.email = req.body.email;
  var password = req.body.pass;
  MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var database = db.db("PoochCare");
    var query = {email: ssn.email, pass: password}
    database.collection('users').findOne(query, function(err, info){
      if(err) throw err;
      if(info){
        console.log(info.fname);
        ssn.firstName = info.fname;
        res.redirect('/profile')
      }else {
        res.render('signin', {error: 'The user you entered does not exist'});
      }
    })
  });
});


module.exports = router;