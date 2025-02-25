import React, { useState,useEffect } from 'react'
import './Navbar.css'

const getCurrentDateTime = () => {
    return new window.Date().toLocaleString("en-US",{ hour: "numeric",minute: "numeric",hour12: true,}); // Fetch current date and time
  };

  const getCurrentDate =()=>{
    return new window.Date().toLocaleDateString("en-US",{weekday:"long",day:"2-digit"})
  };

const Date = () => {
    const [dateTime,setDateTime] = useState(getCurrentDateTime())
    const [date,setDate] = useState(getCurrentDate())

    
    useEffect(() => {
        setDateTime(getCurrentDateTime());

        const interval = setInterval(() => {
            setDateTime(getCurrentDateTime());
            setDate(getCurrentDate)
          }, 60000);
      
          return () => clearInterval(interval); 
        }, []);

  return (
    <div className='date'>
      <h1>{dateTime}</h1>
      <p>{date}</p>
    </div>
  )
}

export default Date
