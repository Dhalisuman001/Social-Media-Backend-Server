const DbConnect = require("./config/db/DbConnect");
const express = require("express");
const cors = require("cors");
const app = express();

DbConnect();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  console.log(req.body);
  res.send(`<h1>Hi This is default gateway ${req.body.name}</h1>`);
});

module.exports = app;
