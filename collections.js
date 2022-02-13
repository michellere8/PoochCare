var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Madremia-15:Madremia-15@cluster0.xupcv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var database= db.db('PoochCare');
    database.createCollection('users', function(err, res){
        if(err) throw err;
        console.log("New Collection (table) created");
        db.close();
    })
});