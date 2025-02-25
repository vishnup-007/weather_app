import React, { useEffect, useState } from 'react'
import './Navbar.css'
import axios from 'axios';
import Date from './Date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from './icon';




const Section = ({getdata}) => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const WEATHER_API_KEY = 'c341234770eac5e99c7fb1adf957a053';
  const GEOCODE_API_KEY = 'c341234770eac5e99c7fb1adf957a053';

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Reverse Geocode (Convert Lat, Lon to Address)
          fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${GEOCODE_API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.results.length > 0) {
                setAddress(data.results[0].formatted);
              } else {
                setAddress('Address not found');
              }
            })
            .catch((err) => setError('Failed to fetch address'));

          // Fetch Weather Data
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`)
            .then((response) => response.json())
            .then((data) => setWeather(data))
            .catch((err) => setError('Failed to fetch weather data'));
        },
        (err) => setError('Location access denied')
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  

  
  return (
    <>
    <div className='section1'>
      <div className='section2 '>
      {weather ? (
        <div>
          
          <h2 className='city'>{weather.name}</h2>
          <Date></Date>
          
        </div>
      ) : (
        <p>Fetching weather data...</p>
      )}

        </div>
      
      
      <div className='section3 '>
      
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : location.latitude && location.longitude ? (
        <>
          
          
        </>
      ) : (
        <p>Fetching location...</p>
      )}

    <p className='current'>Current wheather</p>
      {weather ? (
        <div>
          <h1 className='temp'> <Icon></Icon>{weather.main.temp}°C</h1>
          <p className='current1'>Weather: {weather.weather[0].description}</p>
         
        </div>
      ) : (
        <p>Fetching weather data...</p>
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
     
    
    
    
  );
  
}

export default Section
