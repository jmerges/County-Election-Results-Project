# County-Election-Results-Project
AS a voter, polset I WANT to see the weather outlook for multiple cities SO THAT I can plan a trip accordingly

<br>

===========
![Image](weather.png)

<br>

## Provide Current Weather for Searched City

```
function fiveDay(searchValue){
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${APIkey}`,
    dataType: "json",
    success: function (response) {
      console.log(response)
      $('.forecast').empty()
      for (i=0; i<response.list.length; i++){
        if(response.list[i].dt_txt.indexOf("18:00:00")!== -1){
          var col = $('<div>').addClass('col-2')
          var card= $('<div>').addClass('card')
          var body= $('<div>').addClass('card-body')
          var date = $('<h6>').text(new Date(response.list[i].dt_txt).toLocaleDateString())
          var temp=  $('<p>').text(`Temp: ${response.list[i].main.temp}`)
          var humid= $('<p>').text(`Humidity: ${response.list[i].main.humidity}`)
        col.append(card.append(body.append(date,temp,humid)))
        $('.forecast').append(col)
        }
      }
      // $(".card").text(response.list[2]);
    },
  });
};
```
<br>

## Provide City 5-day Forecast

```
function fiveDay(searchValue){
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${APIkey}`,
    dataType: "json",
    success: function (response) {
      console.log(response)
      $('.forecast').empty()
      for (i=0; i<response.list.length; i++){
        if(response.list[i].dt_txt.indexOf("18:00:00")!== -1){
          var col = $('<div>').addClass('col-2')
          var card= $('<div>').addClass('card')
          var body= $('<div>').addClass('card-body')
          var date = $('<h6>').text(new Date(response.list[i].dt_txt).toLocaleDateString())
          var temp=  $('<p>').text(`Temp: ${response.list[i].main.temp}`)
          var humid= $('<p>').text(`Humidity: ${response.list[i].main.humidity}`)
        col.append(card.append(body.append(date,temp,humid)))
        $('.forecast').append(col)
        }
      }
      // $(".card").text(response.list[2]);
    },
  });
};
```
<br>

## Pin Previosly Searched City in Local Storage 

```
if(!history.includes(searchValue))
history.push(searchValue)
console.log(history)
// uvIndex(searchValue)
localStorage.setItem("cities",JSON.stringify(history))

cities= JSON.parse((localStorage.getItem("cities")))

$('.history').empty()

for (i=0; i<cities.length; i++){
  $(".history").append(cities[i])
}
});
```
<br>


## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Weather API](https://openweathermap.org/api)

## Deployed Link

* [See Live Site]( https://jas-f.github.io/global-weather-dashboard/)

## License

This project is licensed under the MIT License 

## Prerequisites

Git hub
Git lab
Git bash
Visual studio
Google chrome

## Authors

**Jasmine Franklin** 

- [Link to Portfolio Site](https://jas-f.github.io/responsive-portfolio/index.html)
- [Link to Github](https://github.com/Jas-F/global-weather-dashboard)
- [Link to LinkedIn](https://www.linkedin.com/in/jasmine-franklin-8b08ba121)

<p>&copy; UC Berkeley Extension Bootcamp.</p>
