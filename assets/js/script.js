let searchbtn = document.getElementById('searchButton');
let userInput = document.getElementById('input');
let savedHistory = document.getElementById('history');
let cityNames = document.getElementById('cityName');

function fetchWeatherData(cityName) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=2304b782cf519af6ae0e91a9af87effa')
    .then(response => response.json())
    .then(data => {
      console.log(data)

    })

    .catch(error => console.log('error', error));
}