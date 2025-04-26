/**
 * Date: 24-04-2025.
 * Description:
 * Author: M H R Habib.
 */

// Global Variables
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let cityName = "Dhaka";
let apiKey = '4141d67a67254dd7fac44aa883b116a8';

window.onload = () => {
    main();

    // auto call 
    timeUpdate();
}

function main(){
    // Dom References
    const search = document.getElementById("search");
    const searchButton = document.getElementById("searchButton");

    // Event Listener
    searchButton.addEventListener("click", () =>  handleSearch(search));
    search.addEventListener("keydown", (e) => handleEnterButtonForSearch(e,search));
}

// Event handle

function handleSearch(search){
    cityName = search.value.trim();
    getWeatherDate();
}
function handleEnterButtonForSearch(e, search){
    if(e.key === "Enter") handleSearch(search);
}

//dom function

function timeUpdate(){
    let currentTime = new Date();
    const day = days[currentTime.getDay()];
    const date = currentTime.getDate();
    const mon = months[currentTime.getMonth()];
    document.getElementById("fullDate").textContent = `${day}, ${date} ${mon}`;
}

function weatherDate(data){
    const {main, wind, weather, sys, name, clouds} = data;

    const temp = main.temp;
    const feel = main.feels_like;
    const windSpeed = wind.speed;
    const humidity =  main.humidity;
    const country = sys.country;
    const weatherMode = weather[0].description;

    document.getElementById("temperature").textContent = Math.floor(temp);
    document.getElementById("tempFeel").textContent ="Real Feel" + Math.floor(feel) + "°C";
    document.getElementById("weatherCondition").textContent =  weatherMode;
    document.getElementById("windSpeed").textContent = windSpeed + "%";
    document.getElementById("humidityCondition").textContent = humidity + "%";
    document.getElementById("cloudCondition").textContent =  clouds.all + "%";
    document.getElementById("cityName").textContent = name + "," + country;
}


//utilities function

async function getWeatherDate(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    try{
        const response = await fetch(url)
        if(!response.ok) throw new Error(`HTTP error ${response.status}`)
        const data = await response.json()
        weatherDate(data)   
    }
    catch(err){
        console.error(err.message);
        alert("Not Found");
    }
}