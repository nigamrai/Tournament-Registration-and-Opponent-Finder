import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Register />}> </Route>
      <Route path='/login' element={<Login />}> </Route>
    </Routes>



  )

}

export default App
