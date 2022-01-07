//Import the mongoose module
var mongoose = require("mongoose");

//Set up default mongoose connection

//I3ETV5KFLKw4hKs1
//ADMIN

var mongoDB =
  "mongodb+srv://admin:I3ETV5KFLKw4hKs1@cluster0.9yu1g.mongodb.net/Social-Api";
//'mongodb://127.0.0.1/Social-site';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log("Successfully connected to db");
  return;
});

module.exports = db;
