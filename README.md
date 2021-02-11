# County-Election-Results-Project



![Image](./public/img/landing-page.png)

Description
------------


AS a voter, pollster, or politician I want an app where i can view the voter turn out from previous presidential elections. I want to be able to search for votes by county. I want to see the total votes collected by the republican, democratic, and green parties

<br>

## Table of contents

[Built with](#Built-with)<br>
[Features](#Features)<br>
* [Search votes by county](#Search-votes-by-county)<br>
* [See votes collected by each party](#See-votes-collected-by-each-party)<br>
* [Create a user sign up](#Create-a-user-sign-up)<br>
* [Create a user login](#Create-a-user-login)<br>

[Deployed Link](#Deployed-link)<br>
[Authors](#Authors)<br>
[License](#License)

<br>

## Built with

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<br>

## Features
---------------------------------

## Search votes by county
If you input a "County, State" formatted as such, the app will query the database of election results, as well
 as make an API request to the census.gov API. These data will be displayed using chart.js so that the user
 can compare election results with demographic data in the county of choice. Data points are from the years 2000, 2004, 2008,
 2012 and 2016.

```
  <div class="topnav">
    <div class="container-fluid">
      <div class='row'>
        <div class="col-md-4">
          <form class="navbar-form navbar-left" id="searchForm">
            <div id="search" class="form-group">
              <input type="text" class="form-control" placeholder="County, State" id="countySearch">
            </div>
          </form>
        </div>

```
example API request for election database information:
```
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
    });
```
Example API request for census data:
```
    var queryURL = "https://api.census.gov/data/2000/pep/int_charagegroups?get=GEONAME,POP,DATE_DESC&for=county:*&in=state:"+stateNum+"&DATE_DESC=4/1/2000%20population%20estimates%20base";
    queryURL += censusKey;
    $.get(queryURL, function(data) {
        for (var i=0; i<data.length; i++) {
            if (data[i][0] === countyAndState) {
                countyID += data[i][5];
            }
        }
        census2000(stateNum, countyID, populationObj);
    });
```
<br>

## See votes collected by each party
We used chart.js to display voter data. Chart.js is simple to use and looks great. The customization options are a
 little limited, but for our purposes it did the job.

```
    var ctx = 'electionChart';
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2000', '2004', '2008', '2012', '2016'],
            datasets: [{
                label: '% Democratic Candidate Votes',
                data: democratPercent,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }, {
                label: '% Republican Candidate Votes',
                data: republicanPercent,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function (value) {
                          return (value*10).toLocaleString('de-DE', {style:'percent'});
                        },
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: true,
                text:"Presidential Election Data"
            }
        }
    });
```
<br>

## Create a user sign up
----------------------------------
Creating a user sign in requires numerous files to create the MVC pathway. Within the html, this register button points to lines 97-133 to pop up a modal and allow the user to input their desired username, password, and email.

```
  <button type="button" id="registerButton" data-toggle="modal" data-target="#registerUser">Register</button>
```
Part of the client side javascript shown below is to be ran when the register button is clicked on the html. This hands to the database the user's information.

```
function registerUsers(username, password, email) {
    $.post("/api/registerUser", {
      username: username,
      password: password,
      email: email
    })
```
The route that connects the database and the user input is shown below. Here the user's input will be sequelized and stored into the database for future use. It also sends back a message to the user on the webpage if their account creation was successful.
```
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
```


## Create a user login
----------------------------------
Similar to building the user signup for the backend except it will utilize different parts of the html file.
```
<input id="usernameInput" type="text" placeholder="Username">
<input id="passwordInput" type="text" placeholder="Password">
<button type="submit" id="loginButton">Login</button>
```
Next the client javascript login.js is created to listen for a click on the login button
```
loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };
```
When successful, the user will be sent back to the same page but this time logged in. The intention is to have the user's previous searches to be displayed to them.
```
 function loginUser(username, password) {
    $.post("/api/login", {
      username: username,
      password: password
    })
      .then(function() {
        window.location.replace("/");
        // If there's an error, log the error
      })
```
The route to connect the database and user input is shown below. This will have the username and password checked via passport and if correct, will send to the console that login was successful. In a future version, the user's username will be displayed in the top right in place of the username and password input boxes.
```
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
        console.log("Logged in successfully")
        res.json(req.user);
    });
```
<br>


## Deployed link

* [See Live Site](https://enigmatic-woodland-43956.herokuapp.com/)

<br>

## Authors

**Jasmine Franklin** 

- [Link to Portfolio Site](https://jas-f.github.io/responsive-portfolio/index.html)
- [Link to Github](https://github.com/Jas-F/global-weather-dashboard)
- [Link to LinkedIn](https://www.linkedin.com/in/jasmine-franklin-8b08ba121).

**James Merges** 

- [Link to Portfolio Site](https://jmerges.github.io/Portfolio/)
- [Link to Github](https://github.com/jmerges)
- [Link to LinkedIn](https://www.linkedin.com/in/james-merges-b938401b7/)

**Vincent Nguyen** 

- [Link to Portfolio Site](https://vincent-nguyen8931.github.io/Vincent-nguyen8931-portfolio/)
- [Link to Github](https://github.com/vincent-nguyen8931)
- [Link to LinkedIn](https://www.linkedin.com/in/vincent-nguyen-74226a107/)



<br>

## License

MIT License

Copyright (c) [2021] [Jasmine Franklin, James Merges, & Vincent Nguyen]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<p>&copy; UC Berkeley Extension Bootcamp.</p>
