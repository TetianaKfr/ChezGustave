import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Search } from "./pages/Search/Search";
import { Navbar } from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile.jsx";
import { Produit } from "./pages/Produit/Produit";
import { Home } from "./pages/Home/Home";
import { Error } from "./pages/Erreur/Error";
import { Presentation } from "./pages/Presentation/Presentation";
import Commandes from "./pages/Profile/Commandes";
import Reclamations from "./pages/Profile/Reclamations";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/recherche" element={<Search />} />
        <Route path="/profile/reclamations" component={<Reclamations />} />
        <Route         <Route path="/details" element={<Produit />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/profile/orders" component={Commandes} />
path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
