// This test.js file is temporary. Ultimately the code will be
//  included in the clientside javascript file, but for now
//  this file will be used for testing purposes for server side API
//  requests.

var stateMap = {
    "Alabama": "01",
    "Alaska": "02",
    "Arizona": "04",
    "Arkansas": "05",
    "California": "06",
    "Colorado": "08",
    "Connecticut": "09",
    "Delaware": "10",
    "District of Columbia": "11",
    "Florida": "12",
    "Georgia": "13",
    "Hawaii": "15",
    "Idaho": "16",
    "Illinois": "17",
    "Indiana": "18",
    "Iowa": "19",
    "Kansas": "20",
    "Kentucky": "21",
    "Louisiana": "22",
    "Maine": "23",
    "Maryland": "24",
    "Massachusetts": "25",
    "Michigan": "26",
    "Minnesota": "27",
    "Mississippi": "28",
    "Missouri": "29",
    "Montana": "30",
    "Nebraska": "31",
    "Nevada": "32",
    "New Hampshire": "33",
    "New Jersey": "34",
    "New Mexico": "35",
    "New York": "36",
    "North Carolina": "37",
    "North Dakota": "38",
    "Ohio": "39",
    "Oklahoma": "40",
    "Oregon": "41",
    "Pennsylvania": "42",
    "Rhode Island": "44",
    "South Carolina": "45",
    "South Dakota": "46",
    "Tennessee": "47",
    "Texas": "48",
    "Utah": "49",
    "Vermont": "50",
    "Virginia": "51",
    "Washington": "53",
    "West Virginia": "54",
    "Wisconsin": "55",
    "Wyoming": "56",
    "Puerto Rico": "72"
};

// washington is a placeholder for any county -- hardcoded for now,
//  will be changed in the future.
$("#test").on("click", function(event) {
    event.preventDefault();
    console.log('hello');
    var input = $("#submit").val();
    var countyAndState = input.split(", ");
    var county = (countyAndState[0].split(" "))[0];
    county = county.toLowerCase();
    county = county[0].toUpperCase() + county.substring(1);

    var state = countyAndState[1];
    state = state.toLowerCase();
    state = state[0].toUpperCase() + state.substring(1);

    var countyStateString = county+" County, "+state;
    
    stateQuery(state, county);
    censusQuery(stateMap[state], countyStateString);
});

function censusQuery(stateNum, countyAndState) {
    // list of variable names in census API:
    // Total population of a county: B01001_001E
    // White population of county: B01001A_001E
    // Black population of county: B01001B_001E
    // American Indian and Alaskan Native Population: B01001C_001E
    // Asian population: B01001D_001E
    // Pacific islander population: B01001E_001E
    // Hispanic / latino population: B01001I_001E

    // populationObj is an object that has keys of the 5 query years, with arrays as values.
    // These arrays contain the total populations by race for the query county.
    // The array indices correspond to:
    // total: index 0
    // white: index 1
    // black: index 2
    // american indian / alaskan native: index 3
    // asian: index 4
    // pacific islander: 5
    // hispanic / latino: 6

    var populationObj = {
        "2000": [],
        "2004": [],
        "2008": [],
        "2012": [],
        "2016": []
    };

    // First we call the census API to get a county ID. This will save lots of time later on
    var countyID = "";
    var queryURL = "https://api.census.gov/data/2000/pep/int_charagegroups?get=GEONAME,POP,DATE_DESC&for=county:*&in=state:06&DATE_DESC=4/1/2000%20population%20estimates%20base";
    $.get(queryURL, function(data) {
        for (var i=0; i<data.length; i++) {
            if (data[i][0] === countyAndState) {
                countyID += data[i][5];
            }
        }
        census2000(stateNum, countyID, populationObj);
    });




}

function census2000 (stateNum, countyID, populationObj) {
    console.log("census2000");
    var array2000 = [null, null, null, null, null, null, null];
    var array2004 = [null, null, null, null, null, null, null];
    var array2008 = [null, null, null, null, null, null, null];
    var queryURL = "https://api.census.gov/data/2000/pep/int_charagegroups?get=GEONAME,POP,DATE_DESC&for=county:"+countyID+"&in=state:"+stateNum+"&RACE=0,1,2,3,4,5";
    $.get(queryURL, function(data) {
        for (var i=0; i<data.length; i++) {
            // get census data for 2000
            if (data[i][2] === "7/1/2000 population estimate") {
                switch (data[i][3]) {
                    case "0":
                        array2000[0] = parseInt(data[i][1]);
                        break;
                    case "1":
                        array2000[1] = parseInt(data[i][1]);
                        break;
                    case "2":
                        array2000[2] = parseInt(data[i][1]);
                        break;
                    case "3":
                        array2000[3] = parseInt(data[i][1]);
                        break;
                    case "4":
                        array2000[4] = parseInt(data[i][1]);
                        break;
                    case "5":
                        array2000[5] = parseInt(data[i][1]);
                        break;
                }
            } else if (data[i][2] === "7/1/2004 population estimate") {
                switch (data[i][3]) {
                    case "0":
                        array2004[0] = parseInt(data[i][1]);
                        break;
                    case "1":
                        array2004[1] = parseInt(data[i][1]);
                        break;
                    case "2":
                        array2004[2] = parseInt(data[i][1]);
                        break;
                    case "3":
                        array2004[3] = parseInt(data[i][1]);
                        break;
                    case "4":
                        array2004[4] = parseInt(data[i][1]);
                        break;
                    case "5":
                        array2004[5] = parseInt(data[i][1]);
                        break;
                }
            } else if (data[i][2] === "7/1/2008 population estimate") {
                switch (data[i][3]) {
                    case "0":
                        array2008[0] = parseInt(data[i][1]);
                        break;
                    case "1":
                        array2008[1] = parseInt(data[i][1]);
                        break;
                    case "2":
                        array2008[2] = parseInt(data[i][1]);
                        break;
                    case "3":
                        array2008[3] = parseInt(data[i][1]);
                        break;
                    case "4":
                        array2008[4] = parseInt(data[i][1]);
                        break;
                    case "5":
                        array2008[5] = parseInt(data[i][1]);
                        break;
                }
            }
        }
        queryHispURL = "https://api.census.gov/data/2000/pep/int_charagegroups?get=GEONAME,POP,DATE_DESC&for=county:"+countyID+"&in=state:"+stateNum+"&HISP=2";
        $.get(queryHispURL, function(data) {
            for (var i=0; i<data.length; i++) {
                if (data[i][2] === "7/1/2000 population estimate") {
                    array2000[6] = parseInt(data[i][1]);
                }
                else if (data[i][2] === "7/1/2004 population estimate") {
                    array2004[6] = parseInt(data[i][1]);
                }
                else if (data[i][2] === "7/1/2008 population estimate") {
                    array2008[6] = parseInt(data[i][1]);
                }
            }
            populationObj["2000"] = array2000;
            populationObj["2004"] = array2004;
            populationObj["2008"] = array2008;
            census2012(stateNum, countyID, populationObj);
        });
    });
}

function census2012 (stateNum, countyID, populationObj) {
    console.log(stateNum);
    console.log(countyID);
    var queryURL = "https://api.census.gov/data/2012/acs/acs5?get=NAME,B01001_001E,B01001A_001E,B01001B_001E,B01001C_001E,B01001D_001E,B01001E_001E,B01001I_001E&for=county:"+countyID+"&in=state:"+stateNum;
    $.get(queryURL, function(data) {
        populationObj["2012"] = [parseInt(data[1][1]), parseInt(data[1][2]), parseInt(data[1][3]), parseInt(data[1][4]), parseInt(data[1][5]), parseInt(data[1][6]), parseInt(data[1][7])];
        console.log("2012 Total Population: "+data[1][1]);
        console.log("2012 White Population: "+data[1][2]);
        console.log("2012 Black Population: "+data[1][3]);
        console.log("2012 American Indian and Alaskan Native Population: "+data[1][4]);
        console.log("2012 Asian Population: "+data[1][5]);
        console.log("2012 Pacific Islander Population: "+data[1][6]);
        console.log("2012 Hispanic / Latino Population: "+data[1][7]);
        census2016(stateNum, countyID, populationObj);
    });
}

function census2016 (stateNum, countyID, populationObj) {
    var queryURL = "https://api.census.gov/data/2016/acs/acs5?get=NAME,B01001_001E,B01001A_001E,B01001B_001E,B01001C_001E,B01001D_001E,B01001E_001E,B01001I_001E&for=county:"+countyID+"&in=state:"+stateNum;
    $.get(queryURL, function(data) {
        populationObj["2016"] = [parseInt(data[1][1]), parseInt(data[1][2]), parseInt(data[1][3]), parseInt(data[1][4]), parseInt(data[1][5]), parseInt(data[1][6]), parseInt(data[1][7])];
        console.log("2016 Total Population: "+data[1][1]);
        console.log("2016 White Population: "+data[1][2]);
        console.log("2016 Black Population: "+data[1][3]);
        console.log("2016 American Indian and Alaskan Native Population: "+data[1][4]);
        console.log("2016 Asian Population: "+data[1][5]);
        console.log("2016 Pacific Islander Population: "+data[1][6]);
        console.log("2016 Hispanic / Latino Population: "+data[1][7]);
        console.log(populationObj);
    });
}

function stateQuery(state, county) {
    // Function to display list of states where the county is found
    //  so that user can select their state.
    // TODO: populate statelist so that user can select their state

    // For now, we hardcode this state variable but later it will be
    //  user input.

    $.get("/api/democrat/"+state+"/"+county, function(data) {
        renderDemocrat(data);
    });
    $.get("/api/republican/"+state+"/"+county, function(data) {
        renderRepublican(data);
    });
    $.get("/api/green/"+state+"/"+county, function(data) {
        renderGreen(data);
    });
}

function countyQuery(county) {
    $.get("/api/democrat/county", function(data) {
        renderDemocrat(data);
    });
    $.get("/api/republican/county", function(data) {
        renderRepublican(data);
    });
    $.get("/api/green/county", function(data) {
        renderGreen(data);
    });
}

function renderDemocrat(data) {
    // Takes in array of 5 objects that hold the election results for
    //  the county from 2000-2016, and renders the data to the
    //  screen.
    console.log("democratic data: ");
    console.log(data);
}

function renderRepublican(data) {
    // same as democrat, for republican.
    console.log("Republican data: ");
    console.log(data);
}

function renderGreen(data) {
    // same
    console.log("green data: ");
    console.log(data);
}