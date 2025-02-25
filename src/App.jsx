import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Section from './Components/Section'
import { Routes,Route } from 'react-router-dom'
import Search from './Components/Search'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar></Navbar>
    
    <Routes>
      <Route path='/' element={<Section/>}></Route>
      <Route path='/Search' element={<Search/>}/>

      
    </Routes>
     </> 
  )
}

export default App
