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
        <div  className="relative w-full">
            <div 
            className="text-white text-2xl mb-5 block w-full text-center bg-gray-700 bg-opacity-80 rounded-md p-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}>
                {lang === 'en' ? city : cityData[city]}
            </div>
            {isOpen && (
                <ul
                className="absolute left-0 w-full bg-gray-900 bg-opacity-90 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto"
                >
                    {cityList.map((cityName, index) => (
                        <li 
                        className="text-lg text-white px-4 py-2 hover:bg-gray-700 cursor-pointer transition"
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