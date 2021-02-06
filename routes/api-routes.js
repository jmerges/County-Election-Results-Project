var orm = require("../config/orm.js");

module.exports = function(app) {
    // TODO: Add in ask for state functionality when user selects
    //  a county name that exists in multiple states
    
    app.get("/api/democrat/:county", function(req, res) {
        var county = req.params.county;
        orm.getCountyDemocrat(county, function(results) {
            res.json(results);
        });
    });

    app.get("/api/republican/:county", function(req, res) {
        var county = req.params.county;
        orm.getCountyRepublican(county, function(results) {
            res.json(results);
        });
    });

    app.get("/api/green/:county", function(req, res) {
        var county = req.params.county;
        orm.getCountyGreen(county, function(results) {
            res.json(results);
        });
    });
}