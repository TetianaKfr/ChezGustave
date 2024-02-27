import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { Search }  from './pages/Search/Search';
import { Profil } from './pages/Profil/Profil'
import { Produit } from'./pages/Produit/Produit'
import { Home } from './pages/Home/Home'
import { Error } from './pages/Erreur/Error';
import { Presentation } from './pages/Presentation/Presentation';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/recherche' element={ <Search /> } />
        <Route path='/compte' element={ <Profil /> } />
        <Route path='/details' element={ <Produit /> } />
        <Route path='/presentation' element={ <Presentation /> } />
        <Route path='*' element={ <Error /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
