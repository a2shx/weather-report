const GeocodingFetch = async(geoUrlApi) => {
    const {city, state, country, limit, key} = geoUrlApi;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${limit}&appid=${key}`;
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

export default GeocodingFetch;