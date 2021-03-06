// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/homepage.html"));
  });

  app.get("/login", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../views/homepage.html"));
  });

};