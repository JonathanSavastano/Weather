const apiKey = '6c3581679351414b927223614240405';
const apiURL = 'http://api.weatherapi.com/v1';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

// event listener for search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
}); 

// asyncronous function to get weather for city
async function getWeather(city) {
    const url= '${apiURL}?q=${city}&appid=${apiKey}&units=metric';
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = 'Error fetching weather data, please try again.'
    }
}

function displayWeather (data) {
    const { name, main, weather} = data;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];

    weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>${temp}°C</p>
    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
    <p>${description}</p>
    <p>Humidity: ${humidity}%</p>
  `;
}