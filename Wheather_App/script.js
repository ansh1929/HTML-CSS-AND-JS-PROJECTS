//This is for navbar

const toggleBtn = document.querySelector(".toggle-btn");
const searchBar = document.querySelector(".search-bar");
let logic = true;


toggleBtn.addEventListener("click", function () {
    if (logic == true) {
        toggleBtn.style.color = "purple"
        searchBar.classList.add("toggle-class")
        logic = !logic
    } else {
        toggleBtn.style.color = "black";
        searchBar.classList.remove("toggle-class")
        logic = !logic
    }
});

//This is for weather data



const rightBox = document.querySelector(".right-box")
const upperInputValue = document.querySelector("#upper-input-value");
const lowerInputValue = document.querySelector("#lower-input-value");
const upperBtn = document.querySelector("#upper-btn");
const lowerBtn = document.querySelector("#lower-btn");
const currentCity = document.querySelector("#city");
const time = document.querySelector("#time");
const img = document.querySelector("#img");
const temprature = document.querySelector("#temprature");
const weatherStatus = document.querySelector("#weather-status");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const maxTemp = document.querySelector("#max-temp");
const minTemp = document.querySelector("#min-temp");
const latitude = document.querySelector("#latitude");
const longitude = document.querySelector("#longitude");


setInterval(function(){
    const date = new Date();
    time.textContent = `${date.toLocaleTimeString()}`
},1000)


async function checkWeather(city) {
    const apiKey = "ffe8fc7737f660d60745261c18fadc55"
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(apiUrl);
    const responseData = await response.json();
    if(!city){
        alert("please enter the city name")
    }
    else if (responseData.cod === "404") {
        currentCity.innerHTML = `"${city}" is not a valid city`
        img.src = "weather-app-img/error.png"
        temprature.textContent = "";
        weatherStatus.textContent = "";
        upperInputValue.value = "";
        lowerInputValue.value = "";
        rightBox.innerHTML = `<div class="invalid-city"><h1>Sorry City Not Found</h1></div>`
    } else {
        upperInputValue.value = "";
        lowerInputValue.value = "";
        currentCity.textContent = city;
        temprature.innerHTML = `${responseData.main.temp}<sup>°C</sup>`;
        weatherStatus.textContent = `${responseData.weather[0].main}`
        wind.textContent = `${responseData.wind.speed}km/hr`;
        humidity.textContent = `${responseData.main.humidity}%`;
        maxTemp.innerHTML = `${responseData.main.temp_max}<sup>°C</sup>`;
        minTemp.innerHTML = `${responseData.main.temp_min}<sup>°C</sup>`;
        latitude.textContent = `${responseData.coord.lat}°`;
        longitude.textContent = `${responseData.coord.lon}°`;


        switch (responseData.weather[0].main) {
            case "Clouds":
                img.src = "weather-app-img/clouds.png"
                break;

            case "Clear":
                img.src = "weather-app-img/clear.png"
                break;

            case "Haze":
                img.src = "weather-app-img/mist.png"
                break;

            case "Snow":
                img.src = "weather-app-img/snow.png"
                break;

            case "Rain":
                img.src = "weather-app-img/rain.png"
                break;

            default:
                break;
        }
    }
}

upperBtn.addEventListener("click", function () {
    checkWeather(upperInputValue.value)
});

lowerBtn.addEventListener("click", function () {
    checkWeather(lowerInputValue.value)
});


//Exact Location of the user
window.onload = Llocation()

async function Llocation(){
    const location = await navigator.geolocation.getCurrentPosition(success,fail)
}

function success(result) {
    getlocation(result.coords.latitude,result.coords.longitude)
}

function fail() {
    console.log("error");  
}

async function getlocation(lat,lon){
    const apiKey = `ffe8fc7737f660d60745261c18fadc55`
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const data = await fetch(url);
    const resData = await data.json();
    // console.log(resData);
    checkWeather(resData.name)
}






