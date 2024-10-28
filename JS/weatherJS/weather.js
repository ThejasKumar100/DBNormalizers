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
            displayWeather(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayWeather(data) {
    // Converting temperatures to Fahrenheit
    const tempFahrenheit = (data.main.temp * 9/5) + 32;
    const feelsLikeFahrenheit = (data.main.feels_like * 9/5) + 32;
    const tempMinFahrenheit = (data.main.temp_min * 9/5) + 32;
    const tempMaxFahrenheit = (data.main.temp_max * 9/5) + 32;

    // Formatting sunrise and sunset times
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    // Populating data
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
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

// Language change handler
document.getElementById("language-select").addEventListener("change", function () {
    const selectedLanguage = this.value;

    // Set the `lang` attribute on the <html> tag to change the language
    document.documentElement.lang = selectedLanguage;

    // Alternatively, if you have localized URLs, you could redirect to a specific URL.
    // For example:
    // window.location.href = `/${selectedLanguage}/your-page-url`;
});

// Initialize i18next with translations for weather page
i18next.init({
    lng: 'en', // Default language
    resources: {
        en: {
            translation: {
                "app_title": "Weather",
                "nav_flights": "Flights",
                "nav_track": "Track",
                "nav_weather": "Weather",
                "nav_airports": "Airports",
                "current_conditions": "Current Conditions",
                "temperature": "Temperature",
                "humidity": "Humidity",
                "wind_speed": "Wind Speed",
                "forecast": "Forecast",
                "morning": "Morning",
                "afternoon": "Afternoon",
                "evening": "Evening",
                "night": "Night"
            }
        },
        es: {
            translation: {
                "app_title": "Clima",
                "nav_flights": "Vuelos",
                "nav_track": "Rastrear",
                "nav_weather": "Clima",
                "nav_airports": "Aeropuertos",
                "current_conditions": "Condiciones Actuales",
                "temperature": "Temperatura",
                "humidity": "Humedad",
                "wind_speed": "Velocidad del Viento",
                "forecast": "Pronóstico",
                "morning": "Mañana",
                "afternoon": "Tarde",
                "evening": "Noche",
                "night": "Noche"
            }
        },
        fr: {
            translation: {
                "app_title": "Météo",
                "nav_flights": "Vols",
                "nav_track": "Suivre",
                "nav_weather": "Météo",
                "nav_airports": "Aéroports",
                "current_conditions": "Conditions Actuelles",
                "temperature": "Température",
                "humidity": "Humidité",
                "wind_speed": "Vitesse du Vent",
                "forecast": "Prévision",
                "morning": "Matin",
                "afternoon": "Après-midi",
                "evening": "Soir",
                "night": "Nuit"
            }
        },
        de: {
            translation: {
                "app_title": "Wetter",
                "nav_flights": "Flüge",
                "nav_track": "Verfolgen",
                "nav_weather": "Wetter",
                "nav_airports": "Flughäfen",
                "current_conditions": "Aktuelle Bedingungen",
                "temperature": "Temperatur",
                "humidity": "Luftfeuchtigkeit",
                "wind_speed": "Windgeschwindigkeit",
                "forecast": "Vorhersage",
                "morning": "Morgen",
                "afternoon": "Nachmittag",
                "evening": "Abend",
                "night": "Nacht"
            }
        },
        zh: {
            translation: {
                "app_title": "天气",
                "nav_flights": "航班",
                "nav_track": "跟踪",
                "nav_weather": "天气",
                "nav_airports": "机场",
                "current_conditions": "当前状况",
                "temperature": "温度",
                "humidity": "湿度",
                "wind_speed": "风速",
                "forecast": "预报",
                "morning": "早晨",
                "afternoon": "下午",
                "evening": "晚上",
                "night": "夜晚"
            }
        },
        ja: {
            translation: {
                "app_title": "天気",
                "nav_flights": "フライト",
                "nav_track": "追跡",
                "nav_weather": "天気",
                "nav_airports": "空港",
                "current_conditions": "現在の状況",
                "temperature": "温度",
                "humidity": "湿度",
                "wind_speed": "風速",
                "forecast": "予報",
                "morning": "朝",
                "afternoon": "午後",
                "evening": "夕方",
                "night": "夜"
            }
        },
        ru: {
            translation: {
                "app_title": "Погода",
                "nav_flights": "Рейсы",
                "nav_track": "Отслеживание",
                "nav_weather": "Погода",
                "nav_airports": "Аэропорты",
                "current_conditions": "Текущие условия",
                "temperature": "Температура",
                "humidity": "Влажность",
                "wind_speed": "Скорость ветра",
                "forecast": "Прогноз",
                "morning": "Утро",
                "afternoon": "День",
                "evening": "Вечер",
                "night": "Ночь"
            }
        }
    }
}, function (err, t) {
    updateContent(); // Call to set initial translations on load
});

function updateContent() {
    const elements = [
        "app_title", "nav_flights", "nav_track", "nav_weather", "nav_airports",
        "current_conditions", "temperature", "feels_like", "temp_min_max",
        "humidity", "pressure", "visibility", "wind_speed", "sunrise", "sunset"
    ];

    elements.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = i18next.t(id);
        }
    });
}



// Language change handler
document.getElementById("language-select").addEventListener("change", function () {
    const selectedLanguage = this.value;

    // Change language in i18next
    i18next.changeLanguage(selectedLanguage, function () {
        updateContent();
    });
});
