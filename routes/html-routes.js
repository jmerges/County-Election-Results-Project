// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", auth.restrict, function() {
    auth.restrict = function(req, res, next){
      if (!req.session.userid) {
          req.session.redirectTo = '/account';
          res.redirect('/login');
      } else {
          next();
      }
  };
});
  var redirectTo = req.session.redirectTo || '/';
  delete req.session.redirectTo;
  // is authenticated ?
  res.redirect(redirectTo);

  
};