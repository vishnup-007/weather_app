import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Navbar = () => {

  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/Search?q=${encodeURIComponent(city)}`);
    }
  };

  
  return (
    <div className='con'>
    <div className='search-con'>
        
        <FontAwesomeIcon
  icon={faSearch}
  className="text-blue-500 cursor-pointer ml-2"
  size="lg"
/>
        <form onSubmit={handleSearch} >
      <input type="text" placeholder='Search the preffered city.....' className='search' 
      
      value={city} 
      onChange={(e)=>setCity(e.target.value)}/>
      <button  className=" btn1"type='submit'>Search</button>
      </form>
    </div>
  
   
   
    </div>
  )
}

export default Navbar
