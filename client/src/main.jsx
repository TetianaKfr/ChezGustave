import React from "react";
import ReactDOM from "react-dom";
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
import { MentionsLegales } from "./pages/MentionsLegales/MentionsLegales.jsx";
import { CGU } from "./pages/CGU/CGU.jsx";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [housings, setHousings] = useState([]);


    // Fetch logement  
    useEffect(() => {
      const fetchHousings = async () => {
          try {
              const response = await fetch("http://localhost:3630/housings", {
                  method: "GET",
                  headers: {
                      "Authorization": "Bearer " + localStorage.getItem("token"),
                      "Content-Type": "application/json",
                  },
              });

              if (response.ok) {
                  const housings = await response.json();
                  setHousings(housings);
                  console.log(housings)
              } else {
                  console.error("Error fetching housings");
              }
          } catch (error) {
              console.error("Error fetching housings:", error);
          }
      };

      fetchHousings();
  }, []);

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home  housings={housings} />} />
          <Route path="/recherche" element={<Search housings={housings} />} />
          <Route path="/profile/reclamations" element={<Reclamations />} />
          <Route path="/details" element={<Produit />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/profile/orders" element={<Commandes />} />
          <Route path="*" element={<Error />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="CGU" element={<CGU />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
