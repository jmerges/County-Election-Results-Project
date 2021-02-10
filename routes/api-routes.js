var orm = require("../config/orm.js");

var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        console.log("logged in successfully")
        res.json(req.user);
    });


    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/registerUser", function (req, res) {
        console.log(req.body)
        db.User.create({
            username: req.body.username,
            userPassword: req.body.password,
            userEmail: req.body.email
        })
            .then(function () {
                console.log("User successfully cretaed.")
                res.json({success: true, message: "Account created. Please login."});
            })
            .catch(function (err) {
                console.log(err)
                console.log("error occured")
                res.status(401).json(err);
            });
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });

    app.post("/api/democrat/:state/:county/:year/:votes", function(req, res) {
        var state = req.params.state;
        var county = req.params.county;
        var year = req.params.year;
        var votes = req.params.votes;
        var party = "democrat";
        db.State.create({
            stateName: state
        }).then(function(newState) {
            var newCounty = db.County.create({
                countyName: county,
                stateId: newState.get("id")
            });
            return newCounty;

        }).then(function(newCounty) {
            var newParty = db.Party.create({
                partyName: party,
                electionYear: year,
                candidateVotes: votes,
                countyId: newCounty.get("id")
            });
        });
    })

    app.get("/api/democrat/:state/:county", function(req, res) {
        var state = req.params.state;
        var county = req.params.county;
        orm.getCountyStateDemocrat(county, state, function(results) {
            res.json(results);
        });
    });

    app.get("/api/republican/:state/:county", function(req, res) {
        var state = req.params.state;
        var county = req.params.county;
        orm.getCountyStateRepublican(county, state, function(results) {
            res.json(results);
        });
    });


    app.get("/api/green/:state/:county", function(req, res) {
        var state = req.params.state;
        var county = req.params.county;
        orm.getCountyStateGreen(county, state, function(results) {
            res.json(results);
        });
    });
}