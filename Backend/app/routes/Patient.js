// Load the dependencies for the module
const express = require("express");
const Joi = require("joi");
const formidable = require("formidable");
const mv = require("mv");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const router = express.Router();

const url = "mongodb://localhost:27017/pas";
const fileUploadPath =
  "G:/Angular Capstone Project/HotDoc 1.3/Frontend/doctorAppointementSys/src/assets/images/";

// Add new Patient into Database;
router.post("/Patients", function(req, result) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbase = db.db("pas"); //here
      dbase.createCollection("Patients", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        var patient = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          mob_number: req.body.mob_number,
          age: req.body.age,
          address: req.body.address,
          picture: req.body.picture,
          isPatient: true
        };

        dbase.collection("Patients").insertOne(patient, function(err, res) {
          if (err) throw err;

          console.log("1 patient is inserted.");
          result.json("patient is successfully created.");
        });
      });
    }
  );
});

// Get a patient;
router.get("/Patients/:id", function(req, result) {
  let id = req.params.id;
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("pas");
      dbo
        .collection("Patients")
        .find({ _id: ObjectId(id) })
        .toArray(function(err, res) {
          if (err) throw err;
          result.send(res);
          db.close();
        });
    }
  );
});

// Unique email verification;
router.get("/Patients/EmailValidation/:email", function(req, result) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("pas");
      console.log("Checking for uniqueness");
      dbo
        .collection("Patients")
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
router.get("/Patients/MobileValidation/:mobileNumber", function(req, result) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("pas");
      dbo
        .collection("Patients")
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

//Get All patients;
router.get("/Patients", function(req, result) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("pas");
      dbo
        .collection("Patients")
        .find({})
        .toArray(function(err, res) {
          if (err) throw err;
          result.send(res);
          db.close();
        });
    }
  );
});

// Update a patient record
router.put("/Patients", function(req, result) {
  MongoClient.connect(
    url,
    function(err, client) {
      if (err) throw err;
      var dbase = client.db("pas");
      dbase.collection("Patients").updateOne(
        { _id: ObjectId(req.body.id) },
        {
          $push: {
            appointments: {
              doctor: req.body.doctor,
              department: req.body.department,
              Date: req.body.date
            }
          }
        },
        function(err, res) {
          if (err) throw err;

          console.log("1 document updated");
          result.json({
            success: true
          });
          client.close();
        }
      );
    }
  );
});

// Add medicines to Patient Record;
router.put("/Patients/addMedicines", function(req, result) {
  MongoClient.connect(
    url,
    function(err, client) {
      if (err) throw err;
      var dbase = client.db("pas");
      dbase
        .collection("Patients")
        .updateOne(
          { email: req.body.email },
          { $set: { medicines: req.body.medicines } },
          function(err, res) {
            if (err) throw err;

            console.log("1 document updated");
            result.json({
              success: true
            });
            client.close();
          }
        );
    }
  );
});

//Delete a patient record;
router.delete("/Patients/:id", function(req, result) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("pas");

      const id = req.params.id;
      dbo
        .collection("Patients")
        .deleteOne({ _id: ObjectId(id) }, function(err, obj) {
          if (err) return result.status(404).send("No Patient with this id");

          if (obj.deletedCount == 0)
            return result
              .status(404)
              .send("The Patient with the given Id not found.");

          console.log("1 document deleted");
          result.send({
            success: true
          });
          db.close();
        });
    }
  );
});

// Upload patient image;
router.post("/Patients/imageUpload", (req, result) => {
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
