var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017' ;// connection URL
const client = new MongoClient(url) ;// mongodb client
const dbName = 'mydatabase' ;// database name
const collectionName = 'pois'; // collection name

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add', { title: 'PoIs hinzufügen' });
});

router.post('/newpoi', function(req, res, next) 
{
  if(req.body.name==null || req.body.long==null || req.body.name==null){
    res.render('add_notification', { title: 'PoI konnte nicht hinzugefügt werden. Überprüfe eingabe!'});
  }
  console.log("A new poi has been added")

  poi = {
    "type": "Feature",
    "properties": {
      "shape": "Marker",
      "name": req.body.name,
      "category": "default"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        req.body.long,
        req.body.lat
      ]
    }
  }

  console.log(poi);

  // connect to the mongodb database and afterwards, insert one the new element
  client.connect(function(err) 
  {
    assert.equal(null, err);
  
    console.log('Connected successfully to server');
  
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert the document in the database
    collection.insertOne(poi, function(err, result) 
    {
      assert.equal(err, null);
      assert.equal(1, result.result.ok);
      console.log(`Inserted ${result.insertedCount} document into the collection`);
      res.render('add_notification', { title: 'PoI hinzugefügt'});
     })
  
  })    


});

module.exports = router;
