const apiKey = "5d68c1d1a559e27176e6205c64ef5a02";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const backgroundColor = document.querySelector(".card");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

    // Convert wind speed from m/s to km/h
    document.querySelector(".wind").innerHTML =
      (data.wind.speed * 3.6).toFixed(2) + " km/h";

    if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
      backgroundColor.style.background = "#00d2ff";
    } else if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      backgroundColor.style.background = "#62a1c7";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
      backgroundColor.style.background = "#101085";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
      backgroundColor.style.background = "#0f569a";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
      backgroundColor.style.background = "#9faac3";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
      backgroundColor.style.background = "#2b235a";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
