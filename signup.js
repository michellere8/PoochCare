var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Madremia-15:Madremia-15@cluster0.xupcv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var ssn;


router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', function(req, res, next){
  ssn = req.session;
  ssn.firstName = req.body.fname;
  ssn.lastName = req.body.lname;
  ssn.email = req.body.email;
  var password = req.body.pass;
  MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var database = db.db("PoochCare");
    var query = {email: ssn.email}
    database.collection("users").findOne(query, function(err, result){
      if(result){
        req.session.destroy();
        res.render('signup', {error: "This user already exist"});
      }else{
        var userobj = {fname:ssn.firstName, lname:ssn.lastName,email:ssn.email, pass:password};
    database.collection("users").insertOne(userobj, function(err, res){
      if (err) throw err;
      console.log("user added to collection");
      db.close();
      });
      res.redirect('profile');
    }
    });

  });
  
});

module.exports = router;