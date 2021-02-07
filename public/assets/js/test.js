// This test.js file is temporary. Ultimately the code will be
//  included in the clientside javascript file, but for now
//  this file will be used for testing purposes for server side API
//  requests.

// washington is a placeholder for any county -- hardcoded for now,
//  will be changed in the future.
$("#test").on("click", function(event) {
    event.preventDefault();
    console.log('hello');
    var county = $("#submit").val();
    $.get("/api/"+county, function(data) {
        // console.log(data);
        if (data.length > 1) {
            var stateList = [];
            for (var i=0; i<data.length; i++) {
                stateList.push(data[i].state);
            }
            console.log(stateList);
            stateQuery(stateList, county);
        }
        else {
            countyQuery(county);
        }
        console.log(data.length);
    });
});

function stateQuery(stateList, county) {
    // Function to display list of states where the county is found
    //  so that user can select their state.
    // TODO: populate statelist so that user can select their state

    // For now, we hardcode this state variable but later it will be
    //  user input.
    var state = stateList[1];

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