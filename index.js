const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors')

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success.");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //optional
app.use (cors ({credentials: true}));
app.use ((req, res, next) => {
    res.header ('Access-Control-Allow-Origin', '*');
    res.header (
      'Access-Control-Allow-Methods',
      'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE'
    );
    res.header (
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next ();
  });
app.get("/ping", (req, res) => {
  return res.send({
    error: false,
    message: "Server is healthy",
  });
});
app.use('/users', require('./src/routes/users'))
app.use('/bookroom', require('./src/routes/bookroom'))
app.listen(PORT, () => {
  console.log("Server started listening on PORT : " + PORT);
});