import './InputField.css'
import { useState } from "react";

function InputField(props){
    const {cityData,lang, city, geoUrlApi, setCity } = props;
    const [isOpen, setIsOpen] = useState(false);
    const cityList = Object.keys(cityData);

    const handleSelect = (cityName) => {
        setCity({...geoUrlApi, city:cityName});
        setIsOpen(false);
    };

    return(
        <div className="relative w-full">
            <div 
            className="option-bar"
            onClick={() => setIsOpen(!isOpen)}>
                {lang === 'en' ? city : cityData[city]}
            </div>
            {isOpen && (
                <ul
                className="ul-section"
                >
                    {cityList.map((cityName, index) => (
                        <li 
                        className="option-list"
                        key={index} onClick={() => handleSelect(cityName)}>
                            {lang === 'en' ? cityName : cityData[cityName]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default InputField;