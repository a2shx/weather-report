const ForecastFetch = async (weatherUrlApi) => {
    const { type, lat, lon, key, units} = weatherUrlApi;
    const url = `https://api.openweathermap.org/data/2.5/forecast/${type}?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`
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

export default ForecastFetch;