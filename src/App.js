import './App.css';
import { useEffect, useState } from 'react';
import GeocodingFetch from './data/GeocodingFetch';
import WeatherFetch from './data/WeatherFetch';
import LangButton from './component/LangButton';
import InputField from './component/InputField';
import CitiesData from './data/CityName';
import DisplayData from './component/DisplayField';

function App() {
  const [geoUrlApi, setGeoUrlApi] = useState({
    city: 'Bangkok',
    country: 'TH',
    limit: 1,
    state: '',
    key: '40d2dd25c2e79b02b2adabea3ffcf797',
    language: 'en'
});
  const [weatherUrlApi, setWeatherUrlApi] = useState({
    lat: null, 
    lon: null, 
    key: '40d2dd25c2e79b02b2adabea3ffcf797',
    units: 'metric',
  });
  const [weatherData, setWeatherData] = useState(null);
  const [lang, setLang] = useState('en');
  
  const handleLangChange = () => {
    setLang(lang === 'en' ? 'th':'en');
    setWeatherUrlApi({...weatherUrlApi, language: lang === 'en' ? 'th':'en'});
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setWeatherUrlApi({lat: lat, lon: lon, key: geoUrlApi.key, units: 'metric', language: lang});
      },
      () => {
        console.error('Location access denied.');
      }
    );
  },[])

  useEffect(() => {
    const fetchLocation = async() => {
      try{
        const locationData = await GeocodingFetch(geoUrlApi);
        if (locationData && locationData.length >0){
          setWeatherUrlApi({lat: locationData[0].lat, lon: locationData[0].lon, key: geoUrlApi.key, units: 'metric', language: lang});
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
  
  useEffect(() => {
    const fetchWeather = async() => {
        const weatherData = await WeatherFetch(weatherUrlApi);
        if (weatherUrlApi.lat && weatherUrlApi.lon) {
            console.log(weatherData);
            setWeatherData(weatherData);
        }
      }
      if(weatherUrlApi.lat && weatherUrlApi.lon){
        fetchWeather();
      };
    },[weatherUrlApi])

  
    return(
    <div className='main-container'>
      <section>
        <LangButton lang={lang} handleLangChange={handleLangChange}/>
        <InputField cityData={CitiesData} lang={lang} city={geoUrlApi.city} geoUrlApi={geoUrlApi} setCity={setGeoUrlApi}/>
        <DisplayData weatherData={weatherData} lang={lang}/>
      </section>
    </div>
    )
}

export default App;
