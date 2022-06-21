"use strict"

var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


//MongoClient and DB
const url = 'mongodb://localhost:27017' ;// connection URL
const client = new MongoClient(url); // mongodb client
//const { stringify } = require('querystring');
const dbName = 'mydatabase' ;// database name
const collectionName = 'pois'; // collection name

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('delete', { title: 'PoIs löschen' });
});

//Post Location - this post operation can be used to store new locations in the locations collection
router.post('/removePoI', function (req, res, next) {

  console.log("PoI deleted! congrats");

  var poiName = req.body.name;

  //Check if Name exists
  client.connect(function(err)
    {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        collection.find({name: poiName}).toArray(function(err, docs)
        {      
            if(docs.length >= 1){ //if the locations exists and is not in use
                collection.deleteOne({name: poiName}, function(err, results){ //delte the location from the locations collection
                })
                res.send(`You still wanna use use your junk? Fine then!`);
                return;
              }
            else { //if the location does not exist
              res.send(`Woah slow down partner! Things went wild here!`)
                return;
            }
        })
    })
});

/**
 * router.delete(){
 *  
 * }
 */

module.exports = router;