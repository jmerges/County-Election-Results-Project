var orm = require("../config/orm.js");

var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, inform them they have logged in and send them back to their original page.
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        console.log("Logged in successfully")
        res.json(req.user);
    });


    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, inform the user of such and have them login.
    app.post("/api/registerUser", function (req, res) {
        db.User.create({
            username: req.body.username,
            userPassword: req.body.password,
            userEmail: req.body.email
        })
            .then(function () {
                res.json({success: true, message: "Account created. Please login."});
            })
            .catch(function (err) {
                console.log("Error occured")
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

    // New democrat entry
    app.post("/api/democrat/:state/:county/:year/:votes/:totalvotes", function(req, res) {
        var state = req.params.state;
        var county = req.params.county;
        var year = req.params.year;
        var votes = req.params.votes;
        var totalvotes = req.params.totalvotes;
        var party = "democrat";
        db.State.create({
            stateName: state
        }).then(function(newState) {
            console.log(newState.get('id'));
            var newCounty = db.County.create({
                countyName: county,
                StateId: newState.get("id")
            });
            return newCounty;

        }).then(function(newCounty) {
            var newParty = db.Party.create({
                partyName: party,
                electionYear: year,
                candidateVotes: votes,
                totalVotes: totalvotes,
                CountyId: newCounty.get("id")
            });
        }).then(function(newParty) {
            res.json(newParty);
        });
    });

    // New Repubican entry
    app.post("/api/republican/:state/:county/:year/:votes", function(req, res) {
        var state = req.params.state;
        var county = req.params.county;
        var year = req.params.year;
        var votes = req.params.votes;
        var party = "republican";
        db.State.create({
            stateName: state
        }).then(function(newState) {
            console.log(newState.get('id'));
            var newCounty = db.County.create({
                countyName: county,
                StateId: newState.get("id")
            });
            return newCounty;

        }).then(function(newCounty) {
            var newParty = db.Party.create({
                partyName: party,
                electionYear: year,
                candidateVotes: votes,
                totalVotes: null,
                CountyId: newCounty.get("id")
            });
        }).then(function(newParty) {
            res.json(newParty);
        });
    });

    app.get("/api/democrat/:state/:county", function(req, res) {
        var state = req.params.state;
        var county = req.params.county;
        db.State.findAll({
            where: {
                stateName: state
            },
            include: [{
                model: db.County,
                where: {
                    countyName: county
                },
                include: [{
                    model: db.Party,
                    where: {
                        partyName: "democrat"
                    }
                }]
            }]
        }).then(state => {
            res.json(state);
        });
        // orm.getCountyStateDemocrat(county, state, function(results) {
        //     res.json(results);
        // });
    });

    app.get("/api/republican/:state/:county", function(req, res) {
        var state = req.params.state;
        var county = req.params.county;
        db.State.findAll({
            where: {
                stateName: state
            },
            include: [{
                model: db.County,
                where: {
                    countyName: county
                },
                include: [{
                    model: db.Party,
                    where: {
                        partyName: "republican"
                    }
                }]
            }]
        }).then(state => {
            res.json(state);
        });
        // orm.getCountyStateRepublican(county, state, function(results) {
        //     res.json(results);
        // });
    });


    app.get("/api/green/:state/:county", function(req, res) {
        var state = req.params.state;
        var county = req.params.county;
        orm.getCountyStateGreen(county, state, function(results) {
            res.json(results);
        });
    });
}