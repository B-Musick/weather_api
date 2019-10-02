async function getWeather(location){
    
    let latitude = parseFloat(location[0]);
    let longitude = parseFloat(location[1]);

    let url = 'https://fcc-weather-api.glitch.me/';
    let qString = `/api/current?lon=${longitude}&lat=${latitude}`;
    
    const response = await fetch(url+qString);
    let data = await response.json();
    
    document.getElementById('temperature-reading-celsius').textContent = data.main.temp +' ˚C';
    document.getElementById('temperature-reading-farenheit').textContent = ((data.main.temp * 9/5)+32) + ' ˚F';

    document.getElementById('temperature-city').textContent = data.name+", "+data.sys.country;

    getWeatherIcon(data);

}

async function getLocation(){
    if('geolocation' in navigator){
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position)
            getWeather([position.coords.latitude, position.coords.longitude]);
            
        })
    }else{
        console.log('geolocation not available');
    }
}

async function getWeatherIcon(data){
    // Called in the getWeather() method
    let icon = data.weather[0].icon; // Saves the icon for the weather
    let imageUrl = `${icon}`;
    let iconImage = document.getElementById('temperature-icon');
    iconImage.src = imageUrl;
}

getLocation();


let celsiusButton = document.getElementById('celsius-button');
let farenheitButton = document.getElementById('farenheit-button');

celsiusText = document.getElementById('temperature-reading-celsius');
farenheitText = document.getElementById('temperature-reading-farenheit');

celsiusButton.addEventListener('click', (e) => {
    celsiusText.style.display = 'block';
    farenheitText.style.display = 'none';
})

farenheitButton.addEventListener('click', (e) => {
    farenheitText.style.display = 'block';
    celsiusText.style.display = 'none';
})
