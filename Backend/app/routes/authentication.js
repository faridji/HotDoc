var express = require("express");
var jwt = require("jsonwebtoken");
var MongoClient = require("mongodb").MongoClient;
var router = express.Router();
var url = "mongodb://localhost:27017/pas";

var app = express();
var config = require("../config"); // get our config file
app.set("superSecret", config.secret); // secret variable
// ==============================
// JWT based authentication//
// =============================

router.post("/authenticate/patient", function(req, res) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      console.log("Connection Established.");
      var dbo = db.db("pas");
      var query = { email: req.body.email };

      dbo.collection("Patients").findOne(query, function(err, user) {
        if (err) throw err;
        if (!user) {
          console.log("Invalid User email");

          res.status(400).send("Email Not Found");
        } else if (user) {
          // check if password matches
          if (user.password != req.body.password) {
            console.log("Invalid password.");
            res.status(400).send("Invalid Password");
          } else {
            console.log("Creating Token");
            // if user is found and password is right
            // create a token

            var token = jwt.sign(user, app.get("superSecret"), {
              expiresIn: 120 // expires in 2 hours
            });

            // return the information including token as JSON
            res.json({
              success: true,
              message: "Authentication Successful",
              token: token
            });
          }
        }
      });
    }
  );
});

router.post("/authenticate/admin", function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  if ((email == "farid.bsse2344@iiu.edu.pk") & (password == 123)) {
    const payload = {
      name: "Farid ullah",
      isAdmin: true
    };
    var token = jwt.sign(payload, app.get("superSecret"), {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
    res.json({
      success: true,
      message: "Authentication Successful",
      token: token
    });
  } else {
    console.log("Invalid Email or password");
    res.status(400).send("Invalid email/password");
  }
});
module.exports = router;
