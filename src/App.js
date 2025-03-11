import './App.css';
import { useEffect, useState } from 'react';
import GeocodingFetch from './data/GeocodingFetch';
import WeatherFetch from './data/WeatherFetch';

function App() {
  const [geoUrlApi, setGeoUrlApi] = useState({
    city: 'Bangkok',
    country: 'TH',
    limit: 1,
    state: '',
    key: '40d2dd25c2e79b02b2adabea3ffcf797'
});
  const [weatherUrlApi, setWeatherUrlApi] = useState({
    lat: null, 
    lon: null, 
    key: '40d2dd25c2e79b02b2adabea3ffcf797',
    units: 'metric'
  });

  useEffect(() => {
    const fetchLocation = async() => {
      try{
        const locationData = await GeocodingFetch(geoUrlApi);
        if (locationData && locationData.length >0){
          setWeatherUrlApi({lat: locationData[0].lat, lon: locationData[0].lon, key: geoUrlApi.key, units: 'metric'});
          console.log(locationData);
        }
        else{
          console.error("No data found");
        }
      }
      catch(error){
        console.log("Error fetching location data: ", error);
      }
    }
    fetchLocation();
  },[geoUrlApi])
  
  console.log(weatherUrlApi.lat, weatherUrlApi.lon);

  useEffect(() => {
    const fetchWeather = async() => {
        const weatherData = await WeatherFetch(weatherUrlApi);
        if (weatherUrlApi.lat && weatherUrlApi.lon) {
            console.log(weatherData);
        }
      }
      if(weatherUrlApi.lat && weatherUrlApi.lon){
        fetchWeather();
      };
    },[weatherUrlApi])


  
    return(
    <div>
 
    </div>
    )
}

export default App;
