function DisplayData(props){
    const { weatherData, lang } = props;

    const now = new Date();
    
    
    
    if (!weatherData) {
        return <div>Loading...</div>; // You can show a loading spinner or message here
      }

    const formattedNowEn = now.toLocaleTimeString(lang ,{hour: '2-digit', minute: '2-digit', hour12:true});
    const formattedNowTh = now.toLocaleTimeString(lang ,{hour: '2-digit', minute: '2-digit', hour12:false});
    const sunrise = new Date((weatherData.sys.sunrise + weatherData.timezone)*1000);
    const formattedSunriseEn = sunrise.toLocaleTimeString(lang ,{hour: '2-digit', minute: '2-digit', hour12:true});
    const formattedSunriseTh = sunrise.toLocaleTimeString(lang ,{hour: '2-digit', minute: '2-digit', hour12:false});
    return(
        <div>
            <h1>{weatherData.name}</h1>
            <h3>{lang === 'en' ? formattedNowEn: formattedNowTh}</h3>
            <h2>{weatherData.main.temp}  ํC</h2>
            <h3>{weatherData.weather[0].description}</h3>
            <h3>{lang === 'en' ? 'Feels like': 'รู้สึกเหมือน'} {weatherData.main.feels_like} ํC</h3>
            <h3>{lang === 'en' ? 'Min': 'ต่ำสุด'} {weatherData.main.temp_min}  ํC </h3> 
            <h3>{lang === 'en' ? 'Max': 'สูงสุด'} {weatherData.main.temp_max}  ํC</h3>
            <h3>{lang === 'en' ? 'Wind Speed': 'ความเร็วลม'} {weatherData.wind.speed}</h3>
            <h3>{lang === 'en' ? 'Degree': 'องศา'} {weatherData.wind.deg} ํ</h3>
            <h3>{lang === 'en' ? 'Cloud Amount': 'ปริมาณเมฆ'} {weatherData.clouds.all}%</h3>
            <h3>{lang === 'en' ? 'Sun at its peak time': 'เวลาที่ดวงอาทิตย์ขึ้นสูงสุด'} {lang === 'en' ? formattedSunriseEn: formattedSunriseTh}</h3>
        </div>
        )
    }

export default DisplayData;