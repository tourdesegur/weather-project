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
  let mainTemp = document.querySelector(".temp");
  mainTemp.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
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

navigator.geolocation.getCurrentPosition(showCurrentPosition);

let searchForm = document.querySelector("#search-location");
searchForm.addEventListener("submit", changeCity);

let buttonCurrentLocation = document.querySelector("#current-location");
buttonCurrentLocation.addEventListener("click", showCurrentPosition);
