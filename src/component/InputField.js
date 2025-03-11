function InputField(props){
    const {cityData,lang, city, handleCityChange } = props;
    
    const cityList = Object.keys(cityData);
    const mappedCityList = lang ==='en' ? cityList : cityList.map(city => cityData[city]);
    
}
export default InputField;