const { request } = require('express');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Madremia-15:Madremia-15@cluster0.xupcv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var ssn;
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rafa1970c15@gmail.com',
        pass: 'Madremia-15'
    }
});

router.post('/', function(req, res, next){
    var sender = req.body.sender;
    var email = req.body.email;
    var title = req.body.subject;
    var message = req.body.message;
    var mailOptions = {
        from:'rafa1970c15@gmail.com',
        to:'michelle.tejeda@triosstudent.com',
        subject: 'Form: ' + sender + 'At: ' + email,
        text: 'Subject: '+ title + '\n Message: ' + message 
      };

        transporter.sendMail(mailOptions, function(err, info){
            if (err){
                console.log(err, "message not sent");
            } else {
                console.log('Email sent');
                res.redirect('/booking');
            }
        });  
   
})

// router.post('/', function(req, res, next){
//     ssn = req.session;
//     ssn.sender = req.body.sender;
//     ssn.email = req.body.email;
//     ssn.title = req.body.subject;
//     ssn.message = req.body.message;
    
//     MongoClient.connect(url, function(err, db){
//         if (err) throw err;
//         var database = db.db("PoochCare");
//         var userobj = {sender: ssn.sender, email:ssn.email, subject:ssn.title, message:ssn.message };
//         database.collection("users").insertOne(userobj, function(err, res){
//             if(err) throw err;
//             console.log("message added to colections")
//             db.close();
//         });
//     });
//     res.redirect('booking')
// });


module.exports = router;