var MongoClient = require('mongodb').MongoClient;

var URL = 'mongodb://localhost:27017/mydatabase';

MongoClient.connect(URL, function(error, database) {
    if(error) return;

    var collection = database.collection('foods');
    collection.insert({
        name:   'taco',
        tasty:  true
    }, (error, result) => {
        collection.find({
            name:   'taco',
        }).toArray((error, docs) => {
            console.log(docs[0]);
            database.close();
        });
    });
});
