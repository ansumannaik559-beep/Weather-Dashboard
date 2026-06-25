
const day = dayjs();

document.querySelector('.day').innerHTML=day.format('dddd');
document.querySelector('.date').innerHTML=day.format('DD-MM-YYYY');

class coordinates {
        longitude;
        latitude;

        constructor(response){
            this.longitude = response.longitude;
            this.latitude = response.latitude;
        }
    }

class Weatherinfo {
        relative_humidity;
        temp;
        windspeed;

    constructor(response){
        this.relative_humidity = response.relative_humidity_2m;
        this.temp=response.temperature_2m;
        this.windspeed=response.wind_speed_10m;
    }
}

class Weatherinfounit {
        relhumidityunit;
        tempunit;
        windspeedunit;

        constructor(response){
            this.relhumidityunit=response.relative_humidity_2m;
            this.tempunit=response.temperature_2m;
            this.windspeedunit=response.wind_speed_10m;
        }
}

class Weatherinfodaily {
    date;
    maxtemp;
    mintemp;
    weather_code;

    constructor(response){
        this.date = response.time;
        this.maxtemp = response.temperature_2m_max;
        this.mintemp = response.temperature_2m_min;
        this.weather_code = response.weather_code;
    }
}

let coordinatesinpt = [];
let weatherinfo = [];
let weatherinfounits = [];
let weatherdatadaily = [];

async function GetCoordinates(cityname)
{
    try {
        const geodata = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityname}&count=1&language=en&format=json`);
        const georesponse = await geodata.json();
        const geocoordinates = georesponse.results[0];
        
        coordinatesinpt = new coordinates(geocoordinates);

        const weatherdata = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinatesinpt.latitude}&longitude=${coordinatesinpt.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min`);
        const weatherresponse = await weatherdata.json();
        const weatherinfotoday = weatherresponse.current;
        const weatherinfotodayunit = weatherresponse.current_units;
        const weatherinfoweekly = weatherresponse.daily;
        weatherinfo = new Weatherinfo(weatherinfotoday);
        weatherinfounits = new Weatherinfounit(weatherinfotodayunit);
        weatherdatadaily = new Weatherinfodaily(weatherinfoweekly);

        console.log(weatherinfo);
        console.log(weatherinfounits);
        console.log(weatherdatadaily);

        let todaydata = document.querySelector('.today-data');
        todaydata.innerHTML = `<div>Relative Humidity: ${weatherinfo.relative_humidity}</div>
                    <div>Temperature: ${weatherinfo.temp}</div>
                    <div>Wind Speed: ${weatherinfo.windspeed}</div>`;

        
        let weeklydata = document.querySelector('.Weekly-stats');
        weeklydata.innerHTML = 
        `
                <section class="day1 container">
                    <div>Date: ${weatherdatadaily.date[0]}</div>
                    <div>Maximum Temperature: ${weatherdatadaily.maxtemp[0]}</div>
                    <div>Mininmum Temperature: ${weatherdatadaily.mintemp[0]}</div>
                    <div>Weather Code: ${weatherdatadaily.weather_code[0]}</div>
                </section>
            
                <section class="day2 container">
                    <div>Date: ${weatherdatadaily.date[1]}</div>
                    <div>Maximum Temperature: ${weatherdatadaily.maxtemp[1]}</div>
                    <div>Mininmum Temperature: ${weatherdatadaily.mintemp[1]}</div>
                    <div>Weather Code: ${weatherdatadaily.weather_code[1]}</div>
                </section>
                <section class="day3 container">
                    <div>Date: ${weatherdatadaily.date[2]}</div>
                    <div>Maximum Temperature: ${weatherdatadaily.maxtemp[2]}</div>
                    <div>Mininmum Temperature: ${weatherdatadaily.mintemp[2]}</div>
                    <div>Weather Code: ${weatherdatadaily.weather_code[2]}</div>
                </section>
                <section class="day4 container">
                    <div>Date: ${weatherdatadaily.date[3]}</div>
                    <div>Maximum Temperature: ${weatherdatadaily.maxtemp[3]}</div>
                    <div>Mininmum Temperature: ${weatherdatadaily.mintemp[3]}</div>
                    <div>Weather Code: ${weatherdatadaily.weather_code[3]}</div>
                </section>
                <section class="day5 container">
                    <div>Date: ${weatherdatadaily.date[4]}</div>
                    <div>Maximum Temperature: ${weatherdatadaily.maxtemp[4]}</div>
                    <div>Mininmum Temperature: ${weatherdatadaily.mintemp[4]}</div>
                    <div>Weather Code: ${weatherdatadaily.weather_code[4]}</div>
                </section>
                <section class="day6 container">
                    <div>Date: ${weatherdatadaily.date[5]}</div>
                    <div>Maximum Temperature: ${weatherdatadaily.maxtemp[5]}</div>
                    <div>Mininmum Temperature: ${weatherdatadaily.mintemp[5]}</div>
                    <div>Weather Code: ${weatherdatadaily.weather_code[5]}</div>
                </section>
                <section class="day7 container">
                    <div>Date: ${weatherdatadaily.date[6]}</div>
                    <div>Maximum Temperature: ${weatherdatadaily.maxtemp[6]}</div>
                    <div>Mininmum Temperature: ${weatherdatadaily.mintemp[6]}</div>
                    <div>Weather Code: ${weatherdatadaily.weather_code[6]}</div>
                </section>
            `
        


    } catch (error) {
        console.log('Unexpected error. Please try again later.');
    }
    document.querySelector('.city-name').innerHTML = cityname;
    
}

function Coordinates()
{
    const citynameinput = document.querySelector('.place-name');
    const cityname = citynameinput.value;

    GetCoordinates(cityname);
}

GetCoordinates('Delhi');

const search = document.querySelector('.search-button');
search.addEventListener('click',() => {Coordinates();});



