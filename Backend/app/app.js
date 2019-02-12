// Requires all the dependancies
var bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
var app = express();
var config = require("./config"); // get our config file

app.set("port", process.env.PORT || 3000);
app.set("superSecret", config.secret); // secret variable

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("./routes/authentication"));
app.use(require("./routes/Patient"));
app.use(require("./routes/Doctor"));
app.use(require("./routes/Department"));

//Running the server on local host and port = 8081
var server = app.listen(app.get("port"), function() {
  console.log("Listening on http://localhost:" + app.get("port"));
});
