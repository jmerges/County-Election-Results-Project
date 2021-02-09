// add dependencies
var express = require("express");
var session = require("express-session");
var app = express();
var PORT = process.env.PORT || 5501;
var passport = require("./config/passport");
var db = require("./models")

// server middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static("./public/"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// alert user when connected
db.sequelize.sync({force: true}).then(function () {
    app.listen(PORT, () => {
        console.log("connection complete Listening on: http://localhost:" + PORT);
    });
});