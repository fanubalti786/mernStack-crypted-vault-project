import React from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import './index.css'
import {Toaster} from 'react-hot-toast'
import App from './App.jsx'
import Web3Provider from './contexts/Web3Provider.jsx';

createRoot(document.getElementById('root')).render(
  
    <Web3Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
    </Web3Provider>
)

