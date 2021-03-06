"use strict";

var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const app = express(); //initialize express app

const url = "mongodb://mongo:27017"; // connection URL
const client = new MongoClient(url); // mongodb client
const dbName = "mydatabase"; // database name
const collectionName = "pois"; // collection name

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("delete", { title: "PoIs löschen" });
});

//Post Location - this post operation can be used to store new locations in the locations collection
router.post("/delete_poi", function (req, res, next) {
  console.log("PoI deleted!");

  var poiName = req.body.poiname;

  //Check if Name exists
  client.connect(function (err) {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    collection.find({"properties.name": poiName}).toArray(function (err, docs) {
      if (docs.length >= 1) {
        //if the locations exists and is not in use
        collection.deleteOne({"properties.name": poiName}, function (err, results) {
          //delte the location from the locations collection
        });
        res.render("notification", {
          title: "PoI wurde gelöscht.",
        });
      } else {
        //if the location does not exist
        res.render("notification", {
          title: "PoI nicht vorhanden. Überprüfe Eingabe!",
        });
      }
    });
  });
});

module.exports = router;
