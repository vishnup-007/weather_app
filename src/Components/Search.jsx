import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useLocation } from 'react-router-dom';
import Icon from './icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun,faMoon } from "@fortawesome/free-solid-svg-icons";

const Search = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const city = params.get("q");

  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [localTime, setLocalTime] = useState("");
  const [localDate, setLocalDate] = useState("");

  const API_KEY = "c341234770eac5e99c7fb1adf957a053"; 

  useEffect(() => {
    console.log("City from URL:", city);
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        setWeather(data);
        setError(null);

        const timezoneOffset = data.timezone; // Timezone offset in seconds
        const currentUTC = new Date().getTime(); // Current UTC time in milliseconds
        const localTimeDate = new Date(currentUTC + timezoneOffset * 1000);

      
        const formattedTime = localTimeDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

      
        const formattedDate = localTimeDate.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
        });

        setLocalTime(formattedTime);
        setLocalDate(formattedDate);
        

      } catch (err) {
        setError(err.message);
        setWeather(null);
      }
    };

    

    fetchWeather();
  }, [city]);

  
  return (
    <>
    
    <div className='section1'>
        <div className='section2'>
          {weather ?(
            <div className='city1'>
               <h3 className="">{weather.name}, {weather.sys.country}</h3>
               <h1 className="city2">{localTime}</h1>
               <p className="city3">{localDate}</p>
            </div>
          ):(
            <p>fetching</p>
          )

          }

        </div>
        
        <div className='section3'>
        <p className='current'>Current wheather</p>
        

        {error && <h1 className="text-red-500">{error}</h1>}
      {weather ? (
        <div>
          
          <h1 className='temp'>{
            localTime > 6 && localTime<18 
            ? (
              <FontAwesomeIcon icon={faSun} size="lg" color='gold'/> 
              

            ):(
              <FontAwesomeIcon icon={faMoon} size="lg" />
            )
            } <br />{weather.main.temp}°C</h1>  
          <p className='current1'>Weather: {weather.weather[0].description}</p>
        </div>
      ) : (
        <h1 className="text-gray-500">Enter a city to see the weather</h1>
      )}
        </div>

        
            
    </div>

<div className='date-con'>
<div className='data-box'>
{weather ? (
  <div className='data-box'> 
  <p className='temp'>Humidity <br />{weather.main.humidity}%</p></div>
):(
  <p></p>
)}

{weather ? (
  <div className='data-box'> 
  <p className='temp'> Pressure <br />{weather.main.pressure}hpa</p></div>
):(
  <p></p>
)}

{weather ? (
  <div className='data-box'> 
  <p className='temp'>Visibility <br />{weather.visibility / 1000}km</p></div>
):(
  <p></p>
)}

{weather ? (
  <div className='data-box'> 
  <p className='temp'> Wind speed <br />{weather.wind.speed}m/s</p></div>
):(
  <p></p>
)}

  

</div>
</div>
</>
    
  )
}

export default Search
