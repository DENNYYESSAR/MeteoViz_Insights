// Toggle between login and signup views
document.getElementById('show-signup').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.login-view').style.display = 'none';
    document.querySelector('.sign-up-view').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.sign-up-view').style.display = 'none';
    document.querySelector('.login-view').style.display = 'block';
});

// Handle signup form submission
document.getElementById('sign-up-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Perform sign-up logic (e.g., send data to server)
    alert('Sign-up successful!');
    document.querySelector('.sign-up-view').style.display = 'none';
    document.querySelector('.login-view').style.display = 'block';
});

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Perform login logic (e.g., send data to server)
    alert('Login successful!');
    document.querySelector('.auth-views').style.display = 'none';
    document.querySelector('.weather-view').style.display = 'block';
});

// Handle back button
document.getElementById('back-to-auth').addEventListener('click', function() {
    document.querySelector('.weather-view').style.display = 'none';
    document.querySelector('.auth-views').style.display = 'flex';
});

// Fetch weather data using OpenWeatherMap API
function fetchWeatherData(city) {
    const apiKey = 'f603b9ad9663359fb15582782d576d35';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            renderWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Handle search form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    fetchWeatherData(city);
});

// Function to render weather data
function renderWeatherData(data) {
    const weatherDataContainer = document.getElementById('weather-data');
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherDataContainer.innerHTML = `
        <div class="current-weather">
            <h3>Current Weather in ${data.name}, ${data.sys.country}</h3>
            <p>Weather: ${data.weather[0].description}</p>
            <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
        </div>
    `;
}
