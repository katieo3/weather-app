
// Ensuring hours and minutes always display two numbers
function formatDate(timestamp) {

let date = new Date(timestamp);
let weekDate = date.getDate();
let hours = date.getHours();
 if (hours < 10) {
 hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
minutes = `0${minutes}`;
}
 
 // Adding the days
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
// Adding the variables for the date
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[date.getMonth()];
 
return `${day}, ${month} ${weekDate}, ${hours}:${minutes}`;

 
}

// Query Selector accessing the h1
function showConditions(response) {
document.querySelector("h1").innerHTML = response.data.name;
//let unixTimeSunrise = new Date(response.data.sys.sunrise * 1000); 
//let unixHoursSunrise = unixTimeSunrise.getHours();
//let unixMinutesSunrise = "0" + unixTimeSunrise.getMinutes();

//let unixTimeSunset = new Date(response.data.sys.sunset * 1000); 
//let unixHoursSunset = unixTimeSunset.getHours();
//let unixMinutesSunset = "0" + unixTimeSunrise.getMinutes();
//document.querySelector("#sunrise").innerHTML = `Sunrise: ${unixHoursSunrise}:${unixMinutesSunrise}`;
//document.querySelector("#sunset").innerHTML = `Sunset: ${unixHoursSunset}:${unixMinutesSunset}`;

document.querySelector("#current-temperature").innerHTML = `${Math.round(response.data.main.temp)}`;
document.querySelector("#weather-report").innerHTML = (response.data.weather[0].description);
document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
document.querySelector("#wind").innerHTML = `Wind: ${Math.round((response.data.wind.speed)*3.6)} km/h`;
document.querySelector("#dateAPI").innerHTML = formatDate(response.data.dt * 1000);
document.querySelector("#current-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
celsiusTemperature = response.data.main.temp;
fahrenheitTemperature = response.data.main.temp;
}

function defaultTo(city) {
let apiKey = "16643ce7a1c63dfac42b864d84d9384a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showConditions);
}

function search(event) {
 event.preventDefault();
let city = document.querySelector("#city-input").value;
defaultTo(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Retrieve location
function searchLocation(position) {
let lat = position.coords.latitude
let lon = position.coords.longitude
let apiKey = "16643ce7a1c63dfac42b864d84d9384a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showConditions);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", displayCurrentLocation);

// Celsius to Fahrenheit
 function toFahrenheit(event) {
event.preventDefault();
let tempCtoTempF = (celsiusTemperature * 9 / 5) + 32;
cButton.classList.remove("active");
fButton.classList.add("active")
let tempF = document.querySelector("#current-temperature");
tempF.innerHTML = Math.round(`${tempCtoTempF}`);
}
 let fButton = document.querySelector("#fahrenheit");
fButton.addEventListener("click", toFahrenheit);
 
// Fahrenheit to Celsius
 function toCelsius(event){
 event.preventDefault();
 let tempCtoTempF = (celsiusTemperature * 9 / 5) + 32;
 let tempFtoTempC = (tempCtoTempF - 32) * 5 / 9;
 let tempC = document.querySelector("#current-temperature");
 tempC.innerHTML = Math.round(`${tempFtoTempC}`);
 }
let cButton = document.querySelector("#celsius");
cButton.addEventListener("click", toCelsius);

let celsiusTemperature = null;

//Dormant page without input
defaultTo ("Edinburgh");