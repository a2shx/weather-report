import './App.css';
import { useEffect, useState } from 'react';
import GeocodingFetch from './data/GeocodingFetch';
import WeatherFetch from './data/WeatherFetch';
import LangButton from './component/LangButton';
import InputField from './component/InputField';
import CitiesData from './data/CityName';
import DisplayData from './component/DisplayField';
import getWeatherAssets from './component/WeatherAssets';

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
  const [geoData, setGeoData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [lang, setLang] = useState('en');
  const [videoBG, setVideoBG] = useState('/weatherBG/Purple-hour.mp4');
  
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

    useEffect(() => {
      if (weatherData) {
        const nowHour = new Date().getHours();
        const { video } = getWeatherAssets(weatherData.weather[0].main, nowHour);
        setVideoBG(video);
      }
    }, [weatherData]);

    console.log(videoBG)

    return(
      <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        key={videoBG}
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={videoBG} type="video/mp4" />
      </video>
    
      {/* Content (above the video) */}
      <div className="main-container">
        <div className="absolute top-4 right-4"> 
          <LangButton lang={lang} handleLangChange={handleLangChange} />
        </div>
        <InputField cityData={CitiesData} lang={lang} city={geoUrlApi.city} geoUrlApi={geoUrlApi} setCity={setGeoUrlApi}/>
        <DisplayData weatherData={weatherData} lang={lang}/>
      </div>
    </div>
    )
}

export default App;
