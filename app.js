function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    alert("Please enter a city");
  }
  let apiKey = "3d73d57a7d0400b1fa10cc357f423133";
  let units = "metric";
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#temperature");
  showTemp.innerHTML = `${temp}`;

  let descrip = document.querySelector("#descrip");
  descrip.innerHTML = response.data.weather[0].description;

  let Humidity = document.querySelector("#Humidity");
  Humidity.innerHTML = "Humidity: " + response.data.main.humidity;

  let w = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#Wind");
  wind.innerHTML = "Wind: " + w + " km/h";
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp) + "°";

  document.querySelector("#Humidity").innerHTML =
    "Humidity: " + response.data.main.humidity;
  document.querySelector("#Wind").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed);
  document.querySelector("#desc").innerHTML =
    response.data.weather[0].description;
}
function searchLocation(position) {
  let apiKey = "3d73d57a7d0400b1fa10cc357f423133";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-btn");
currentLocationButton.addEventListener("submit", getCurrentLocation);

let currentDate = new Date();
let dateNow = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let time = currentDate.getHours();
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dateNow.innerHTML = `${day} ${time}:${minutes}`;
