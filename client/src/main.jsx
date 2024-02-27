import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Search } from "./pages/Search/Search";
import { Navbar } from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile.jsx";
import Commandes from "./pages/Profile/Commandes";
import Reclamations from "./pages/Profile/Reclamations";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Routes should be declared here. */}
        <Route path="/" element={<Navbar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/orders" component={Commandes} />
        <Route path="/profile/reclamations" component={Reclamations} />
      </Routes>
    </Router>
  </React.StrictMode>
);
