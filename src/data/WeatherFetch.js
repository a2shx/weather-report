const WeatherFetch = async (weatherUrlApi) => {
    const { lat, lon, key, units, language } = weatherUrlApi;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${language}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log("Error fetching weather data: ", error);
        return [];
    }
    
}

export default WeatherFetch;