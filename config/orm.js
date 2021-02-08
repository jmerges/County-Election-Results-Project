var connection = require("./connection.js");

var orm = {

    getCountyDemocrat: function(county, cb) {
        queryString = "SELECT candidatevotes FROM countypres WHERE party = 'democrat' AND county = '"+county+"'";
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

    getCountyGreen: function(county, cb) {
        queryString = "SELECT candidatevotes FROM countypres WHERE party = 'green' AND county = '"+county+"'";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = orm;