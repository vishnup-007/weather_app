import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";


const Icon = () => {
    const currentHour = new Date().getHours(); // Get current hour (0-23)

  let message;
  if (currentHour >6 && currentHour<18) {
    message=<><FontAwesomeIcon icon={faSun} size="lg" color='gold'/> </>

  
  } else {
    message =<> <FontAwesomeIcon icon={faMoon} size="lg" /></>;
  }

  



  return (
    
    <div>
      {message}
    </div>
  )
};

export default Icon
