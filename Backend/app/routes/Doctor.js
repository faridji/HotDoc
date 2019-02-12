var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var router = express.Router();
var url = "mongodb://localhost:27017/pas";
const formidable = require("formidable");
var mv = require("mv");

let fileUploadPath =
  "G:/Angular Capstone Project/HotDoc 1.3/Frontend/doctorAppointementSys/src/assets/images/";
router.post("/Doctors", function(req, result) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbase = db.db("pas");
      dbase.createCollection("Doctors", function(err, res) {
        console.log(req.body.education);
        if (err) throw err;
        console.log("Collection created!");
        var doctor = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          mob_number: req.body.mob_number,
          age: req.body.age,
          education: req.body.education,
          experience: req.body.experience,
          department: req.body.department,
          address: req.body.address,
          picture: req.body.picture,
          isDoctor: true
        };

        console.log(doctor);

        dbase.collection("Doctors").insertOne(doctor, function(err, res) {
          if (err) throw err;

          console.log("1 doctor is inserted.");
          result.json("doctor is successfully created.");
        });
      });
    }
  );
});

router.get("/Doctors", function(req, result) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("pas");
      dbo
        .collection("Doctors")
        .find({})
        .toArray(function(err, res) {
          if (err) throw err;
          result.send(res);
          db.close();
        });
    }
  );
});

router.get("/Doctors/:id", function(req, result) {
  let id = req.params.id;
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("pas");
      dbo
        .collection("Doctors")
        .find({ _id: ObjectId(id) })
        .toArray(function(err, res) {
          if (err) throw err;
          result.send(res);
          db.close();
        });
    }
  );
});

router.delete("/Doctors/:id", function(req, result) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("pas");
      const id = req.params.id;

      dbo
        .collection("Doctors")
        .deleteOne({ _id: ObjectId(id) }, function(err, obj) {
          if (err) throw err;

          if (obj.deletedCount == 0)
            return result
              .status(404)
              .send("The Doctor with the given Id not found.");

          console.log("1 document deleted");
          result.send({
            success: true
          });
          db.close();
        });
    }
  );
});

// Unique email verification;
router.get("/Doctors/EmailValidation/:email", function(req, result) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("pas");
      console.log("Checking for uniqueness");
      dbo
        .collection("Doctors")
        .find({ email: req.params.email })
        .toArray(function(err, res) {
          if (err) throw err;

          if (res.length > 0) result.send(true);
          else result.send(false);
          db.close();
        });
    }
  );
});

// Unique Mobile number verification;
router.get("/Doctors/MobileValidation/:mobileNumber", function(req, result) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("pas");
      dbo
        .collection("Doctors")
        .find({ mob_number: req.params.mobileNumber })
        .toArray(function(err, res) {
          if (err) throw err;
          if (res.length > 0) result.send(true);
          else result.send(false);
          db.close();
        });
    }
  );
});

router.post("/Doctors/imageUpload", (req, result) => {
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
