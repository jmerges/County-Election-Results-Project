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
    console.log(stateNum);
    console.log(countyAndState);
    var queryURL = "https://api.census.gov/data/2012/acs/acs5?get=NAME,B01001_001E,B01001A_001E,B01001B_001E,B01001C_001E,B01001D_001E,B01001E_001E,B01001I_001E&for=county:*&in=state:"+stateNum;
    $.get(queryURL, function(data) {
        for (var i=0; i<data.length; i++) {
            if (data[i][0] === countyAndState) {
                console.log("2012 Total Population: "+data[i][1]);
                console.log("2012 White Population: "+data[i][2]);
                console.log("2012 Black Population: "+data[i][3]);
                console.log("2012 American Indian and Alaskan Native Population: "+data[i][4]);
                console.log("2012 Asian Population: "+data[i][5]);
                console.log("2012 Pacific Islander Population: "+data[i][6]);
                console.log("2012 Hispanic / Latino Population: "+data[i][7]);
            }
        }
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