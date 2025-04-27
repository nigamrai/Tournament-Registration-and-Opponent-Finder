import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'

import './App.css'
import Login from './pages/Login'
import AdminDashboard from './pages/CreateTournament'
// import Register from './pages/Register'
// import AdminLayout from './Layouts/AdminLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<AdminDashboard />}> </Route>
      <Route path='/login' element={<Login />}> </Route>
    </Routes>



  )

}

export default App
