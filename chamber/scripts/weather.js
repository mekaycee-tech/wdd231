// OpenWeatherMap API script for Uturu, Abia State
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your free OpenWeatherMap API key
const lat = "5.8344";  // Latitude for Uturu
const lon = "7.4475";  // Longitude for Uturu

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayCurrentWeather(data);
    } else {
      console.error("Weather data fetch error:", response.statusText);
    }
  } catch (error) {
    console.error("Network error fetching weather:", error);
  }
}

function displayCurrentWeather(data) {
  const currentTempEl = document.getElementById("current-temp");
  const weatherDescEl = document.getElementById("weather-desc");
  const weatherIconEl = document.getElementById("weather-icon");

  currentTempEl.textContent = Math.round(data.main.temp);
  
  // Format weather description text
  const desc = data.weather[0].description;
  weatherDescEl.textContent = desc;

  // Weather Icon
  const iconCode = data.weather[0].icon;
  weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIconEl.alt = desc;
}

async function fetchForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
    }
  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
}

function displayForecast(data) {
  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = "";

  // Filter forecast data for 12:00 PM readings across 3 distinct days
  const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

  dailyForecasts.forEach(day => {
    const dateObj = new Date(day.dt * 1000);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });

    const forecastRow = document.createElement("div");
    forecastRow.classList.add("forecast-item");
    forecastRow.innerHTML = `
      <p><strong>${dayName}:</strong> ${Math.round(day.main.temp)}°C - <span class="capitalize">${day.weather[0].description}</span></p>
    `;
    forecastContainer.appendChild(forecastRow);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchWeather();
  fetchForecast();
});