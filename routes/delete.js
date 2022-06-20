var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // mongodb client
const dbName = 'mydatabase' // database name
const collectionName = 'pois' // collection name

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('delete', { title: 'PoIs löschen' });
});

/**
 * router.delete(){
 *  
 * }
 */

module.exports = router;