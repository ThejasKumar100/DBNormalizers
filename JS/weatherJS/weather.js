document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }
    getWeather(city);
});

function getWeather(city) {
    const apiKey = 'e43a2221ea706b60ecefcd224b6d81d1'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or API error.');
            }
            return response.json();
        })
        .then(data => {
            // Fetch state information using Nominatim API
            const nominatimUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(data.name)}&country=${data.sys.country}&format=json&limit=1`;
            return fetch(nominatimUrl)
                .then(response => response.json())
                .then(locationData => {
                    if (locationData.length > 0 && locationData[0].state) {
                        data.state = locationData[0].state; // Add state to data object
                    } else {
                        data.state = null;
                    }
                    return data;
                });
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayWeather(data) {
    const tempFahrenheit = (data.main.temp * 9/5) + 32;
    const feelsLikeFahrenheit = (data.main.feels_like * 9/5) + 32;
    const tempMinFahrenheit = (data.main.temp_min * 9/5) + 32;
    const tempMaxFahrenheit = (data.main.temp_max * 9/5) + 32;

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    // Display the city name with the state if available
    const location = `${data.name}, ${data.state ? data.state + ', ' : ''}${data.sys.country}`;
    document.getElementById('city-name').textContent = location;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `${data.main.temp}°C / ${tempFahrenheit.toFixed(1)}°F`;
    document.getElementById('feels-like').textContent = `${data.main.feels_like}°C / ${feelsLikeFahrenheit.toFixed(1)}°F`;
    document.getElementById('temp-min-max').textContent = `${data.main.temp_min}°C / ${tempMinFahrenheit.toFixed(1)}°F - ${data.main.temp_max}°C / ${tempMaxFahrenheit.toFixed(1)}°F`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${data.visibility / 1000} km`;
    document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-result').style.display = 'block';
}
// Function to update time
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById("current-time").innerText = ` ${hours}:${minutes}:${seconds}`;
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call to set time immediately
