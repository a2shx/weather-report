import { useEffect, useState } from 'react';
import './DisplayField.css';
import getWeatherAssets from './WeatherAssets';
function DisplayData(props){
    const { weatherData, lang} = props;
    const [ weatherImg, setWeatherImg ] = useState(null);
    useEffect(() => {
            if (weatherData) {
                    const nowHour = new Date().getHours();                
                    const {img} = getWeatherAssets(weatherData.weather[0].main, nowHour);
                    setWeatherImg(img)
                };
    },[weatherData]);
    

    if (!weatherData) {
        return <div className='block w-full text-white text-4xl text-center mt-20'>Loading...</div>; // You can show a loading spinner or message here
      }



    const sunrise = new Date((weatherData.sys.sunrise + weatherData.timezone)*1000);
    const formattedSunriseEn = sunrise.toLocaleTimeString(lang ,{hour: '2-digit', minute: '2-digit', hour12:true});
    const formattedSunriseTh = sunrise.toLocaleTimeString(lang ,{hour: '2-digit', minute: '2-digit', hour12:false});
    return(
        <div className="main-display-container grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="temp-section">
                <h3 className='text-xl'>{weatherData.name}</h3>
                <img className='weather-img' src={weatherImg} alt={weatherData.weather[0].description} />
                <h2 className='temp'>{weatherData.main.temp}  ํC</h2>
                <h3 className='text-xl'>{weatherData.weather[0].description}</h3>
                <h3 className='temp-des'>{lang === 'en' ? 'Feels like': 'รู้สึกเหมือน'} {weatherData.main.feels_like} ํC</h3>
                <h3 className='temp-des'>{lang === 'en' ? 'Min: ': 'ต่ำสุด: '} {weatherData.main.temp_min}  ํC        {lang === 'en' ? 'Max: ': 'สูงสุด: '} {weatherData.main.temp_max}  ํC</h3> 
            </div>
            <div className='grid-container grid grid-cols-2 grid-rows-2 gap-4 md-col2'>
                <div className="display-container col-span-1">
                    <img className='des-img' src='/weather-icon/cloudy.png' alt="cloud amount" />
                    <img className='des-img' src='/weather-icon/humidity.png' alt="humidity" />
                    <h3>{lang === 'en' ? 'Humidity: ': 'ความชื้น: '} {weatherData.main.humidity} %</h3>
                    <h3>{lang === 'en' ? 'Cloud Amount: ': 'ปริมาณเมฆ: '} {weatherData.clouds.all}%</h3>
                </div>
                <div className="display-container col-span-1">
                    <img className='des-img' src='/weather-icon/wind.png' alt="cloud amount" />
                    <h3>{lang === 'en' ? 'Wind Speed': 'ความเร็วลม'} {weatherData.wind.speed}</h3>
                    <h3>{lang === 'en' ? 'Degree': 'องศา'} {weatherData.wind.deg} ํ</h3>
                </div>
                <div className='display-container col-span-2'>
                    <img className='des-img' src='/weather-icon/sun.png' alt="cloud amount" />
                    <h3>{lang === 'en' ? 'Sun at its peak time ': 'เวลาที่ดวงอาทิตย์ขึ้นสูงสุด '} 
                    {lang === 'en' ? formattedSunriseEn: formattedSunriseTh}</h3>
                </div>
            </div>
        </div>
        )
    }

export default DisplayData;