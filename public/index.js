async function getWeather(location){
    
    let latitude = parseFloat(location[0]);
    let longitude = parseFloat(location[1]);

    let url = 'https://api.openweathermap.org/data/2.5/weather';
    let qString = "?lat="+latitude+"&lon="+longitude+"&units=metric&appid=";
    
    const response = await fetch(url+qString+apiKey);
    let data = await response.json();
    
    document.getElementById('temperature-reading').textContent = data.main.temp +' ˚C';
    document.getElementById('temperature-city').textContent = data.name;

    // Set image icon
    // let icon = data.weather[0].icon;
    // let imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    // let iconImage = document.getElementById('temperature-icon');
    // iconImage.src = imageUrl;
    getWeatherIcon(data);

}

async function getLocation(){
    if('geolocation' in navigator){
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position)
            getWeather([position.coords.latitude, position.coords.longitude]);
            getFiveDayForecast([position.coords.latitude, position.coords.longitude])
        })
    }else{
        console.log('geolocation not available');
    }
}

async function getWeatherIcon(data){
    // Called in the getWeather() method
    let icon = data.weather[0].icon; // Saves the icon for the weather
    let imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    let iconImage = document.getElementById('temperature-icon');
    iconImage.src = imageUrl;
}

getLocation();

async function getFiveDayForecast(location){
    let months = {
        0:'January',
        8:'September',
        9:'October'
    }
    let latitude = parseFloat(location[0]);
    let longitude = parseFloat(location[1]);
    let url = 'https://api.openweathermap.org/data/2.5/forecast';
    let qString = "?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=";
    
    const response = await fetch(url + qString + apiKey);
    let data = await response.json();
    
    let titleDate = new Date(data.list[0].dt_txt);
    let dateContainer = document.getElementById('forecast-date');
    dateContainer.textContent = "Tomorrow ("+months[titleDate.getUTCMonth()] + " " + titleDate.getUTCDate() + ", " + titleDate.getFullYear()+")";

    for(let i = 0; i<5;i++){
        let date = new Date(data.list[i].dt_txt);



        console.log(data);
        let weatherContainer = document.createElement('div');
        weatherContainer.className = 'temperature-day-container-class'
        weatherContainer.id = 'temperature-day-container-'+i;
        // let weatherDate = document.createElement('h3');
        // let textNode = document.createTextNode(months[date.getUTCMonth()]+" "+date.getUTCDate()+", "+date.getFullYear());
        let timeDiv = document.createElement('h4');
        let timeNode = document.createTextNode(date.getHours()+":00");
        timeDiv.appendChild(timeNode);
        // weatherDate.appendChild(textNode);
        // weatherContainer.appendChild(weatherDate);
        weatherContainer.appendChild(timeDiv);

        let forecastContainer = document.getElementById('two-day-forecast');
        forecastContainer.appendChild(weatherContainer);

        // Set image
        let icon = data.list[i].weather[0].icon;
        let imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        let imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        weatherContainer.appendChild(imageElement);

        // SET TEMP
        let temp = data.list[i].main.temp;
        let tempDiv = document.createElement('h4');
        let tempNode = document.createTextNode(temp + ' ˚C');
        tempDiv.appendChild(tempNode);
        weatherContainer.appendChild(tempDiv);

    }
    


}


