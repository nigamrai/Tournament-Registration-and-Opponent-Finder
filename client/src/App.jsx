import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegistrationCard from './component/RegistrationCars.jsx'
import CreateTournament from './pages/CreateTournament.jsx'
import FindOpponent from './pages/FindOpponent.jsx'
import Login from './pages/Login'
import Register from './pages/Register'
import Registration from './pages/Registration'
import Tournament from './pages/Tournament'
import TournamentDetails from './pages/TournamentDetails'

function App() {
 
  return <>
  
  <Routes>
    <Route path='/signup' element={<Register />}> </Route>
      <Route path='/' element={<Login />}> </Route>
    <Route path="/tournament" element={<Tournament />} />
    <Route path="/tournamentDetails" element={<TournamentDetails />} />
    <Route path="/registration" element={<Registration />} />
    
    <Route path="/registrationCard" element={<RegistrationCard />} />
    <Route path="/FindOpponent" element={<FindOpponent />} />
    <Route path="/tournament/create" element={<CreateTournament/>}/>
  </Routes>
  </>

}
export default App
