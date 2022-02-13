const { request } = require('express');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Madremia-15:Madremia-15@cluster0.xupcv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var ssn;

router.get('/', function(req, res, next) {
    ssn = req.session;
  res.render('booking');
});

router.post('/', function(req, res, next){
    ssn = req.session;
    ssn.firstName = req.body.name;
    ssn.phone = req.body.phone;
    ssn.email = req.body.email;
    ssn.adress = req.body.adress;
    ssn.dname = req.body.dogname;
    ssn.size = req.body.size;
    ssn.serv = req.body.service;
    ssn.date = req.body.date;
    ssn.time = req.body.time;

    MongoClient.connect(url, function(err, db){
        if (err) throw err;
        var database = db.db("PoochCare");
        var userobj = {name: ssn.firstName, email:ssn.email, phone:ssn.phone, 
            adress:ssn.adress, dogname:ssn.dname, size:ssn.size, service:ssn.serv, date:ssn.date, time: ssn.time };
        database.collection("users").insertOne(userobj, function(err, res){
            if(err) throw err;
            console.log("Appointment added to colections")
            db.close();
        });
    });
    res.render('booking', {message: "Your appointment is booked"});
 });

module.exports = router; 