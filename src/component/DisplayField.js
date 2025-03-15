import { useEffect, useState } from 'react';
import './DisplayField.css';
function DisplayData(props){
    const { weatherData, lang } = props;
    const [weatherImg, setWeatherImg] = useState(null);
    useEffect(() => {
            if (weatherData) {
                    const nowHour = new Date().getHours();
                    const dayTime = nowHour >= 6 && nowHour < 18;
                
                    switch (weatherData.weather[0].main) {
                        case 'Clear': setWeatherImg(dayTime ? '/weather-icon/sun.png' : '/weather-icon/moon.png'); break;
                        case 'Clouds': setWeatherImg(dayTime ? '/weather-icon/cloud-sun.png' : '/weather-icon/cloud-moon.png'); break;
                        case 'Rain': setWeatherImg('/weather-icon/rain.png'); break;
                        case 'Drizzle': setWeatherImg('/weather-icon/rain.png'); break;
                        case 'Thunderstorm': setWeatherImg('/weather-icon/rain-storm'); break;
                        case 'Mist': setWeatherImg('/weather-icon/mist.png'); break;
                        case 'Haze': setWeatherImg('/weather-icon/mist.png'); break;
                        case 'Dust': setWeatherImg('/weather-icon/mist.png'); break;
                    };
                };
    },[weatherData]);
    

    if (!weatherData) {
        return <div>Loading...</div>; // You can show a loading spinner or message here
      }



    const sunrise = new Date((weatherData.sys.sunrise + weatherData.timezone)*1000);
    const formattedSunriseEn = sunrise.toLocaleTimeString(lang ,{hour: '2-digit', minute: '2-digit', hour12:true});
    const formattedSunriseTh = sunrise.toLocaleTimeString(lang ,{hour: '2-digit', minute: '2-digit', hour12:false});
    return(
        <div className="main-display-container">
            <div className="text-white justify-items-center mb-5">
                <img className='max-w-xs' src={weatherImg} alt={weatherData.weather[0].description} />
                <h2 className='text-5xl mb-5 font-semibold'>{weatherData.main.temp}  ํC</h2>
                <h3>{lang === 'en' ? 'Feels like': 'รู้สึกเหมือน'} {weatherData.main.feels_like} ํC</h3>
                <h3>{lang === 'en' ? 'Min': 'ต่ำสุด'} {weatherData.main.temp_min}  ํC {lang === 'en' ? 'Max': 'สูงสุด'} {weatherData.main.temp_max}  ํC</h3> 
            </div>
            <div className="display-container">
                <h3>{weatherData.weather[0].description}</h3>
                <h3>{lang === 'en' ? 'Cloud Amount': 'ปริมาณเมฆ'} {weatherData.clouds.all}%</h3>
            </div>
            <div className="display-container">
            <h3>{lang === 'en' ? 'Wind Speed': 'ความเร็วลม'} {weatherData.wind.speed}</h3>
            <h3>{lang === 'en' ? 'Degree': 'องศา'} {weatherData.wind.deg} ํ</h3>
            <h3>{lang === 'en' ? 'Sun at its peak time ': 'เวลาที่ดวงอาทิตย์ขึ้นสูงสุด '} 
                {lang === 'en' ? formattedSunriseEn: formattedSunriseTh}</h3>
            </div>
        </div>
        )
    }

export default DisplayData;