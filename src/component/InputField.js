function InputField(props){
    const {cityData,lang, city, handleCityChange } = props;
    const cityList = Object.keys(cityData);

    return(
        <div>
            <select value={city} onChange={handleCityChange}>
                {cityList.map((cityName, index) => (
                    <option key={index} value={cityName}>
                        {lang === 'en' ? cityName : cityData[cityName]}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default InputField;