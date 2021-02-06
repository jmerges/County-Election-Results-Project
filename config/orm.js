var connection = require("./connection.js");

var orm = {

    getCountyStateList: function(county, cb) {
        queryString = "SELECT state FROM countypres WHERE party = 'democrat' AND county = '"+county+"' AND year = 2000";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    getCountyDemocrat: function(county, cb) {
        queryString = "SELECT candidatevotes FROM countypres WHERE party = 'democrat' AND county = '"+county+"'";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    getCountyStateDemocrat: function(county, state, cb) {
        queryString = "SELECT candidatevotes FROM countypres WHERE party = 'democrat' AND county = '"+county+"' AND state = '"+state+"'";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    getCountyRepublican: function(county, cb) {
        queryString = "SELECT candidatevotes FROM countypres WHERE party = 'republican' AND county = '"+county+"'";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    getCountyStateRepublican: function(county, state, cb) {
        queryString = "SELECT candidatevotes FROM countypres WHERE party = 'republican' AND county = '"+county+"' AND state = '"+state+"'";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    getCountyGreen: function(county, cb) {
        queryString = "SELECT candidatevotes FROM countypres WHERE party = 'green' AND county = '"+county+"'";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    getCountyStateGreen: function(county, state, cb) {
        queryString = "SELECT candidatevotes FROM countypres WHERE party = 'green' AND county = '"+county+"' AND state = '"+state+"'";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = orm;