var orm = require("../config/orm.js");

var db = require("../models");

module.exports = function (app) {

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/registerUser", function (req, res) {
        db.User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
            .then(function () {
                res.redirect(307, "/api/registerUser");
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    // TODO: Add in ask for state functionality when user selects
    //  a county name that exists in multiple states

    app.get("/api/democrat/:county", function (req, res) {
        var county = req.params.county;
        orm.getCountyDemocrat(county, function (results) {

    // TODO: Add in ask for state functionality when user selects
    //  a county name that exists in multiple states
    
    app.get("/api/democrat/:county", function(req, res) {
        var county = req.params.county;
        orm.getCountyDemocrat(county, function(results) {
            res.json(results);
        });
    });

    app.get("/api/republican/:county", function (req, res) {
        var county = req.params.county;
        orm.getCountyRepublican(county, function (results) {

    app.get("/api/republican/:county", function(req, res) {
        var county = req.params.county;
        orm.getCountyRepublican(county, function(results) {
            res.json(results);
        });
    });


    app.get("/api/green/:county", function (req, res) {
        var county = req.params.county;
        orm.getCountyGreen(county, function (results) {

    app.get("/api/green/:county", function(req, res) {
        var county = req.params.county;
        orm.getCountyGreen(county, function(results) {

            res.json(results);
        });
    });
}