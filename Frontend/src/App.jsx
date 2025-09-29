import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import UpdateDetails from './Pages/UpdateDetails';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/UpdateDetails' element={<UpdateDetails/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
