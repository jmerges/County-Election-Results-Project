// This test.js file is temporary. Ultimately the code will be
//  included in the clientside javascript file, but for now
//  this file will be used for testing purposes for server side API
//  requests.

// washington is a placeholder for any county -- hardcoded for now,
//  will be changed in the future.
$("#test").on("click", function() {
    $.get("/api/washington", function(data) {
        // console.log(data);
        if (data.length > 1) {
            var stateList = [];
            for (var i=0; i<data.length; i++) {
                stateList.push(data[i].state);
            }
            console.log(stateList);
            stateQuery(stateList);
        }
        console.log(data.length);
    });
});

function stateQuery(stateList) {
    // Function to display list of states where the county is found
    //  so that user can select their state.
    // TODO: populate statelist so that user can select their state

    // For now, we hardcode this state variable but later it will be
    //  user input.
    var state = stateList[1];
}