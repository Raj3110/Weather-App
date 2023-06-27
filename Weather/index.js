const container = document.querySelector('.container');
const search = document.querySelector('.search-bar button');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const not_found = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const API_KEY = '1e8aedf5977475a39d5bf16ed5a5f856';
    const city = document.querySelector('.search-bar input').value;

    if (city === ''){
        container.style.height = "105px";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(json => {

            if (json.cod === '404') {
                container.style.height = "400px";
                weatherbox.style.display = 'none';
                weatherdetails.style.display = 'none';
                not_found.style.display = 'block';
                not_found.classList.add('fadeIn');
                return;
            }

            not_found.style.display = 'none';
            not_found.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img')
            const temperature = document.querySelector('.temperature')
            const desc = document.querySelector('.desc')
            const humidity = document.querySelector('.weather-details .humidity span')
            const wind = document.querySelector('.weather-details .wind span')

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
            desc.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed}Km/h`;

            weatherbox.style.display = '';
            weatherdetails.style.display = '';
            weatherbox.classList.add('fadeIn');
            weatherdetails.classList.add('fadeIn');
            container.style.height = '590px';

        });
});