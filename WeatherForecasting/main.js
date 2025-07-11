// const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${zipCode}&days=7`);
// const url = 'http://api.weatherapi.com/v1/current.json';

const api_key = '';

let input = document.querySelector("input");
let temp = document.querySelector("#temp");
let cityName = document.querySelector("#cityName");
let humidty = document.querySelector("#humidity")
let date = document.querySelector("#date");
let time = document.querySelector("#time");
let weather = document.querySelector("#weather");
let wind = document.querySelector("#wind");
let searchBtn = document.querySelector("#search");
let mainImage = document.querySelector("#mainIcon");
let sec_mainImage = document.querySelector("#secondaryMainIcon");
let error = document.querySelector("#error");

function getInput(){
    if(input.value === '')
        input.value = "London"
    return input.value;
}
function loadImage(keyword){
    console.log(mainImage)
    if(keyword == "Sunny"){
        mainImage.src = "src/sun.png";
        sec_mainImage.src = "src/sun.png";
    }
    else if(keyword == "Partly cloudy"){
        mainImage.src = "src/cloudy.png";
        sec_nImage.src = "src/cloudy.png";
    }
    else if(keyword == "clear"){
        mainImage.src = "src/cloudy.png";
        sec_mainImage.src = "src/cloudy.png";
    }
    else if(keyword == "cloudy"){
        mainImage.src = "src/cloud.png";
        sec_mainImage.src = "src/cloud.png";
    }
    else if(keyword.includes("Thundery")){
        mainImage.src = "src/storm.png"
        sec_mainImage.src = "src/storm.png"
    }
    else if(keyword.includes("Rainy")){
        mainImage.src = "src/rainy_day.png";
        sec_mainImage.src = "src/rainy_day.png";
    }

}
async function getData(city){
    console.log(city)
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`);
    const data = await response.json();
    return data;
}

searchBtn.addEventListener("click",()=>{
    let city_input = getInput();
    let response = getData(city_input);
    response.then(data=>{
       let current = data["current"];
       let location = data["location"];
        cityName.innerText = city_input;
        temp.innerText = current["temp_c"];
        wind.innerText = `${current["wind_kph"]} Km/ph`;
        humidty.innerText = current["humidity"];
        date.innerText = current["last_updated"].split(" ")[0];
        time.innerText = current["last_updated"].split(" ")[1];
        weather.innerText = current["condition"]["text"];
        loadImage(weather.innerText);
        
    }).catch(err =>{
        if(err){
            error.innerText = err;
            error.style.display = "block";
        }
    })
})

searchBtn.click();

