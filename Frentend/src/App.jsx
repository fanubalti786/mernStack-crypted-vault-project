import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
export default function App() {
  return (
    
      <Routes>
        <Route path='/' element={<Wallet/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    
    
  )
}
