const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const router = express.Router();
const url = "mongodb://localhost:27017/pas";
const formidable = require("formidable");
const mv = require("mv");

let fileUploadPath =
  "G:/Angular Capstone Project/HotDoc 1.3/Frontend/doctorAppointementSys/src/assets/images/";

router.post("/Departments", function(req, result) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbase = db.db("pas"); //here
      dbase.createCollection("Departments", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        var dept = {
          name: req.body.name,
          description: req.body.description,
          picture: req.body.picture
        };

        console.log(dept);
        dbase.collection("Departments").insertOne(dept, function(err, res) {
          if (err) throw err;

          console.log("1 dept is inserted.");
          result.json("Dept is successfully created.");
        });
      });
    }
  );
});

router.get("/Departments", function(req, result) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("pas");
      dbo
        .collection("Departments")
        .find({})
        .toArray(function(err, res) {
          if (err) throw err;
          result.send(res);
          db.close();
        });
    }
  );
});

router.delete("/Departments/:id", function(req, result) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("pas");
      const id = req.params.id;
      dbo
        .collection("Departments")
        .deleteOne({ _id: ObjectId(id) }, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          result.send({
            success: true
          });
          db.close();
        });
    }
  );
});

router.post("/Departments/imageUpload", (req, result) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var oldpath = files.photo.path;
    var newpath = fileUploadPath + files.photo.name;

    mv(oldpath, newpath, function(err) {
      if (err) throw err;
      console.log("File uploaded to" + newpath);
      result.json({
        success: true
      });
    });
  });
});

module.exports = router;
