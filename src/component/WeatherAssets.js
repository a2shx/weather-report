const getWeatherAssets = (weather, hour) => {
    const dayTime = hour >= 6 && hour < 18;

    const weatherAssets = {
        Clear: {
            img: dayTime ? '/weather-icon/sun.png' : '/weather-icon/moon.png',
            video: dayTime ? '/WeatherBG/Clear-Sky.mp4' : '/WeatherBG/Clear-Sky-N.mp4'
        },
        Clouds: {
            img: dayTime ? '/weather-icon/cloud-sun.png' : '/weather-icon/cloud-moon.png',
            video: dayTime ? '/WeatherBG/Cloud.mp4' : '/WeatherBG/Purple-hour.mp4'
        },
        Rain: {
            img: '/weather-icon/rain.png',
            video: '/WeatherBG/Rain.mp4'
        },
        Drizzle: {
            img: '/weather-icon/rain.png',
            video: '/WeatherBG/Rain.mp4'
        },
        Thunderstorm: {
            img: '/weather-icon/rain-storm.png',
            video: '/WeatherBG/Rain-Storm.mp4'
        },
        Mist: {
            img: '/weather-icon/mist.png',
            video: '/WeatherBG/Haze.mp4'
        },
        Haze: {
            img: '/weather-icon/mist.png',
            video: '/WeatherBG/Haze.mp4'
        },
        Dust: {
            img: '/weather-icon/mist.png',
            video: '/WeatherBG/Haze.mp4'
        }
    };

    return weatherAssets[weather] || {
        img: '/weather-icon/default.png',
        video: '/WeatherBG/default.mp4'
    };
};

export default getWeatherAssets;
