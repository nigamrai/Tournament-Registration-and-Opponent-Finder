import React, { useState } from 'react'
import Navbar from './component/Navbar.jsx'
import  { Routes, Route} from 'react-router-dom'
import Tournament from './pages/Tournament'
import TournamentDetails from './pages/TournamentDetails'
import Registration from './pages/Registration'
import RegistrationCard from './component/RegistrationCars.jsx'
import './App.css'
function App() {
 
  return <>
  
  <Routes>
    <Route path="/" element={<Tournament />} />
    <Route path="/TournamentDetails" element={<TournamentDetails />} />
    <Route path="/Registration" element={<Registration />} />
    <Route path="/RegistrationCard" element={<RegistrationCard />} />
  </Routes>
  </>
}
export default App
