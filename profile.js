var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Madremia-15:Madremia-15@cluster0.xupcv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var ssn;

router.get('/', function(req, res, next) {
  ssn = req.session;
  if(ssn.email){
  res.render('profile', {firstName: ssn.firstName});
}else {
  ssn.profileError = "You need to sign in first";
  res.redirect('/signin');
}

res.render('profile', {firstName: ssn.firstName});
});

// router.post('/', function(req, res, next) {
//   ssn = req.session;
//   MongoClient.connect(url, function(err, db){
//     if (err) throw err;
//     var database = db.db("PoochCare");
//     var userobj = {email:ssn.email, phone:ssn.phone, 
//         adress:ssn.adress, dogname:ssn.dname, size:ssn.size, service:ssn.serv, date:ssn.date, time: ssn.time };
//         database.collection("users").find(userobj).toArray(function(err, result){
//           if (err) throw err;
//           resultArray = result;
//           console.log(result);
//         db.close();
//         });
       
//   });
//   res.render('profile', {firstName: ssn.firstName},
//   {dogname:ssn.dname}, {service:ssn.serv}, {date:ssn.date}, {time: ssn.time});
  
// });

// router.get('/', function(req, res, next){
//   var resultArray = []
//   MongoClient.connect(url, function(err, db){
//     if(err)throw err;
//     var database = db.db("PoochCare");
//     database.collection('users').find({}).toArray(function(err, result){
//       if(err)throw err;
//       resultArray = result;
//       db.close();
//     })
//   })
//   res.render('profile', {appointments : resultArray})
// });



module.exports = router;