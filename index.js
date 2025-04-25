const weatherForm = document.querySelector('.weatherForm');
        const cityInput = document.querySelector('.cityInput');
        const card = document.querySelector('.card');
        const errorCard = document.querySelector('.errorCard');
        const apiKey = "6d5d782360d2af9cabf040381d4af5f8";

        weatherForm.addEventListener('submit', async event => {
            event.preventDefault();
            const city = cityInput.value.trim();
            if (city) {
                try {
                    const weatherData = await getWeatherData(city);
                    displayWeatherInfo(weatherData);
                } catch (error) {
                    console.error(error);
                    displayError(error.message);
                }
            } else {
                displayError('Please enter a city');
            }
        });

        async function getWeatherData(city) {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Could not fetch weather data');
            }
            return await response.json();
        }

        function displayWeatherInfo(data) {
            const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;
            
            card.classList.remove('hidden');
            errorCard.classList.add('hidden');
            
            document.querySelector('.cityDisplay').textContent = city;
            document.querySelector('.tempDisplay').textContent = `${(temp - 273.15).toFixed(1)}°C`;
            document.querySelector('.humidityDisplay').textContent = `Humidity: ${humidity}%`;
            document.querySelector('.descDisplay').textContent = description;
            document.querySelector('.weatherEmoji').textContent = getWeatherEmoji(id);
        }

        function getWeatherEmoji(weatherId) {
            switch (true) {
                case (weatherId >= 200 && weatherId < 300): return '⛈️';
                case (weatherId >= 300 && weatherId < 400): return '🌨️';
                case (weatherId >= 500 && weatherId < 600): return '🌧️';
                case (weatherId >= 600 && weatherId < 700): return '❄️';
                case (weatherId >= 700 && weatherId < 800): return '🌬️';
                case (weatherId === 800): return '☀️';
                case (weatherId >= 801 && weatherId < 810): return '🌥️';
                default: return '❓';
            }
        }

        function displayError(message) {
            errorCard.classList.remove('hidden');
            card.classList.add('hidden');
            document.querySelector('.errorDisplay').textContent = message;
        }