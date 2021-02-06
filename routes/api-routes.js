var orm = require("../config/orm.js");

module.exports = function(app) {
    // TODO: Add in ask for state functionality when user selects
    //  a county name that exists in multiple states

    // This API call is to determine if there are multiple counties
    //  in different states with the same name.
    app.get("/api/:county", function(req, res) {
        var county = req.params.county;
        orm.getCountyStateList(county, function(results) {
            res.json(results);
        });
    });

    // These api calls are to get county election data.
    app.get("/api/democrat/:county", function(req, res) {
        var county = req.params.county;
        orm.getCountyDemocrat(county, function(results) {
            res.json(results);
        });
    });

    app.get("/api/democrat/:state/:county", function(req, res) {
        var state = req.params.state;
        var county = req.params.county;
        orm.getCountyStateDemocrat(county, state, function(results) {
            res.json(results);
        });
    });

    app.get("/api/republican/:county", function(req, res) {
        var county = req.params.county;
        orm.getCountyRepublican(county, function(results) {
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

    app.get("/api/green/:county", function(req, res) {
        var county = req.params.county;
        orm.getCountyGreen(county, function(results) {
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