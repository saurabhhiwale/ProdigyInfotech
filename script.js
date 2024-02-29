function getWeather() {
  const apiKey = '22a11e2b008330591f005bf79f851bad';
  const City = document.getElementById('city').value;

  if(!City) {
    alert('Please anter a City');
    return;
  }

const currentweatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}`;
const forecastUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=${apiKey}`;

fetch(currentweatherUrl)
      .then(responce => responce.json())
      .then(data =>{
          displayWeather(data);
      })
      .catch(error => {
         console.error('Error fetching current weather data', error);
              alert('Error fetching current weather data. Please try again.');
      });


      fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });

}


function displayWeather(data) {
  const tempDivInfo = document.getElementById('temp-div');
  const weatherInfodiv = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');
  const hourlyForecastDiv = document.getElementById('hourly-forecast');
  
  weatherInfodiv.innerHTML ='';
  hourlyForecastDiv.innerHTML ='';
  tempDivInfo.innerHTML ='';                    

  if (data.cod ==='404') {
    weatherInfodiv.innerHTML = `<p>${data.message}</p>`;
  } else {

    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML =`
    <p>${temperature} °C</p>`;

    const weatherHTML = `
    <p>${cityName}</P>
    <p>${description}</p>`;

    tempDivInfo.innerHTML= temperatureHTML;
    weatherInfodiv.innerHTML= weatherHTML;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();

  }
}

function displayHourlyForecast(hourlyData) {

  const hourlyForecastDiv = document.getElementById('hourly-forecast');

  const next24Hours = hourlyData.slice(0, 8);


  next24Hours.forEach(item =>{
    const dateTime = new Date(item.dt * 1000);
    const hour =  dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl =`https://openweathermap.org/img/wn/${iconCode}.png`;

const hourlyItemHTML = `
      <div class="hourly-item">
         <span>${hour}:00</span>
         <img src="${iconUrl}" alt="Hourly Weather Icon">
         <span>${temperature} °C</span>
      </div>`;
      hourlyForecastDiv.innerHTML += hourlyItemHTML;

  });
  
}


function showImage() {

  const weatherIcon = document.getElementById('weather-icon');
  weatherIcon.style.display = 'block';
}