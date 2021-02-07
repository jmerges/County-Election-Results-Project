// add dependencies
var express = require("express");
var app = express();
var PORT = process.env.PORT || 5501;

// server middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'))

// routes
var api = require("./routes/api-routes")

// alert user when connected
app.listen(PORT,() => {
    console.log("connection complete Listening on: http://localhost:" + PORT);
});