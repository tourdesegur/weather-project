debugger;

let now = new Date();
console.log(now);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hour = String(now.getHours()).padStart(2, "0");
let min = String(now.getMinutes()).padStart(2, "0");

let subDayTime = document.querySelector(".day-time");
subDayTime.innerHTML = `${day}, ${hour}:${min}`;

function currentCityWeather(response) {
  console.log(response);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let weather = response.data.weather[0].main;

  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute("src", `media/${weather}.png`);

  let mainTemp = document.querySelector(".temp");
  mainTemp.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

  getForecast(response.data.coord);
}

function showCurrentPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "f8620effd7466dda0c3530a3be2c5f5e";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

  axios.get(url).then(currentCityWeather);
}

function searchCityWeather(city) {
  let key = "f8620effd7466dda0c3530a3be2c5f5e";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(currentCityWeather);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-location").value;
  searchCityWeather(city);
}

function getForecast(coordinates) {
  let apiKey = "f8620effd7466dda0c3530a3be2c5f5e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response);
  console.log(response.data);
  console.log(response.data.daily[0].weather[0].main);
  let forecastDaily = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastDaily.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="card">
                  <div class="card-body">
                    <h2 class="day">${formatDay(forecastDay.dt)}</h2>
                    <span><img src="media/small-icons/${
                      forecastDay.weather[0].main
                    }.png" alt="" class="icon-forecast" id="icon"></span>
                    <p class="temp-small">
                      ${Math.round(
                        forecastDay.temp.max
                      )}° &zwnj; &zwnj; <span class="t-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
                    </p>
                  </div>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

navigator.geolocation.getCurrentPosition(showCurrentPosition);

let searchForm = document.querySelector("#search-location");
searchForm.addEventListener("submit", changeCity);

let buttonCurrentLocation = document.querySelector("#current-location");
buttonCurrentLocation.addEventListener("click", getCurrentPosition);
