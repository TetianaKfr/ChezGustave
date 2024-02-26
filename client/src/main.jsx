import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { Search }  from './pages/Search/Search';
import { Navbar } from './components/Navbar/Navbar';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        { /* Routes should be declared here. */ }
        <Route path='/' element={ <Navbar /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
