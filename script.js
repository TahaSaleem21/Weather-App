document.querySelector(".search-btn").addEventListener("click", getWeather);

document
  .querySelector(".search-bar")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      getWeather();
    }
  });

function getWeather() {
  const apiKey = "d8e6daf81a0c33fb18d62f08d33c7c7b";
  const city = document.querySelector(".search-bar").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  setTimeout(function () {
    document.querySelector(".loading").style.display = "block";
  }, 100);

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const weatherDescription = data.weather[0].description;

      const weatherIcon = getWeatherIcon(weatherDescription);
      const temperatureIcon = getTemperatureIcon(temperature);

      const weatherDisplay = `
        <div class="weather-icon">${weatherIcon}</div>
        <div class="weather-description">${weatherDescription}</div>
        <div class="temperature">${temperatureIcon} ${temperature}°C</div>
        <div class="humidity">Humidity: ${humidity}%</div>
      `;

      document.querySelector(".weather").innerHTML = weatherDisplay;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      document.querySelector(".weather").textContent =
        "Could not fetch weather data";
    });
}
function getWeatherIcon(description) {
  if (description.includes("cloud")) return "<i class='fas fa-cloud'></i>";
  if (description.includes("mist") || description.includes("haze"))
    return "<i class='fas fa-smog'></i>";
  if (description.includes("rain")) return "<i class='fas fa-cloud-rain'></i>";
  if (description.includes("snow")) return "<i class='far fa-snowflake'></i>";
  return "<i class='fas fa-sun'></i>";
}

function getTemperatureIcon(temperature) {
  if (temperature < 0) return "<i class='fas fa-snowflake'></i>";
  if (temperature < 10) return "<i class='fas fa-cloud-showers-heavy'></i>";
  if (temperature < 20) return "<i class='fas fa-cloud'></i>";
  if (temperature < 30) return "<i class='fas fa-cloud-sun'></i>";
  return "<i class='fas fa-sun'></i>";
}
