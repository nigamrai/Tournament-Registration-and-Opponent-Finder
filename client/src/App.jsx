import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'
import Navbar from './component/Navbar.jsx'
import Tournament from './pages/Tournament'
import TournamentDetails from './pages/TournamentDetails'
import Registration from './pages/Registration'
import RegistrationCard from './component/RegistrationCars.jsx'
import FindOpponent from './pages/FindOpponent.jsx'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
 
  return <>
  
  <Routes>
    <Route path='/' element={<Register />}> </Route>
      <Route path='/login' element={<Login />}> </Route>
    <Route path="/Tournament" element={<Tournament />} />
    <Route path="/TournamentDetails" element={<TournamentDetails />} />
    <Route path="/Registration" element={<Registration />} />
    <Route path="/RegistrationCard" element={<RegistrationCard />} />
    <Route path="/FindOpponent" element={<FindOpponent />} />
  </Routes>
  </>

}
export default App
