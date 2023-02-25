let searchbtn = document.getElementById('searchButton');
let userInput = document.getElementById('input');
let savedHistory = document.getElementById('history');
let cityNames = document.getElementById('cityName');

function fetchWeatherData(cityName) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=2304b782cf519af6ae0e91a9af87effa')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      for (let i = 0; i < 5; i++) {
        document.getElementById('temp').innerHTML = 'Temp: ' + (Number(data.list[i].main.temp - 273.15) * 9 / 5 + 32).toFixed() + ' °F';
        document.getElementById('wind').innerHTML = 'Wind: ' + (data.list[i].wind.speed) + ' MPH';
        document.getElementById('humidity').innerHTML = 'Humidity: ' + (data.list[i].main.humidity) + ' %';
        document.getElementById('img').src = " http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
      }

      const date = new Date(data.list[0].dt * 1000);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      cityNames.innerHTML = data.city.name + ' ' + month + "/" + day + "/" + year;

      for (let i = 0; i < 5; i++) {
        document.getElementById('date' + (i + 1)).innerText = month + "/" + day + "/" + year;
        // document.getElementById('date' + (i + 1)).innerText = data.list[i].dt_txt;
        document.getElementById('temp' + (i + 1)).innerText = 'Temp: ' + (Number(data.list[i].main.temp - 273.15) * 9 / 5 + 32).toFixed() + ' °F';
        document.getElementById('wind' + (i + 1)).innerHTML = 'Wind: ' + (data.list[i].wind.speed) + ' MPH';
        document.getElementById('humidity' + (i + 1)).innerHTML = 'Humidity: ' + (data.list[i].main.humidity) + ' %';
        document.getElementById('img' + (i + 1)).src = " http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
      }

    })

    .catch(error => console.log('error', error));
}

function getCityName() {
  fetchWeatherData(userInput.value);

  let inputEl = document.createElement('input');
  inputEl.setAttribute('type', 'text');
  inputEl.setAttribute('readonly', true);
  inputEl.setAttribute('class', 'form-control d-block bg-white');
  inputEl.setAttribute('value', userInput.value)
  inputEl.append(userInput.value);
  savedHistory.append(inputEl);

  inputEl.addEventListener('click', function () {
    fetchWeatherData(this.value);
  })
};

function renderSearchHistory() {
  for (let i = 0; i < userHistory.length; i++) {
    let inputEl = document.createElement('input');
    inputEl.setAttribute('type', 'text');
    inputEl.setAttribute('readonly', true);
    inputEl.setAttribute('class', 'form-control d-block bg-white');
    inputEl.setAttribute('value', userHistory[i])
    inputEl.append(userHistory[i]);
    savedHistory.append(inputEl);
    inputEl.addEventListener('click', function () {
      fetchWeatherData( userHistory[i])
    })
  }
}


renderSearchHistory();

searchbtn.addEventListener('click', function () {
  let userSearch = userInput.value;
  userHistory.push(userSearch);
  localStorage.setItem("cityHistory", JSON.stringify(userHistory));
  getCityName();
})