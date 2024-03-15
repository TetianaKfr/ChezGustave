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
import { RGPD } from "./pages/RGPD/RGPD.jsx";
import { useState } from "react";
import { useEffect } from "react";
import LoginContext, { SessionState } from "./LoginContext.jsx";
import BookingDatesContext from "./BookingDatesContext.jsx";

function App() {
  const [housings, setHousings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(SessionState.NotConnected);
  const [bookingDates, setBookingDates] = useState({ start: null, end: null });

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
          const housingNames = await response.json();
          let housingList = [];
          for (const housingName of housingNames) {
            const housingDetail = await fetch("http://localhost:3630/housing", {
              method: "POST",
              headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: housingName }),
            });

            if (!housingDetail.ok) {
              console.error("Error fetching details", housingDetail.statusText);
              continue;
            }

            housingList.push({ name: housingName, ...await housingDetail.json() });
          }

          setHousings(housingList);
        } else {
          console.error("Error fetching housing names:", response.statusText);
        }
      } catch (error) {
        console.error("Error :", error.message);
      }
    };
    fetchHousings();
  }, []);

  return (
    <React.StrictMode>
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <BookingDatesContext.Provider value={{bookingDates, setBookingDates}}>
          <Router>
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Home housings={housings} />} />
              <Route path="/recherche" element={<Search housings={housings} />} />
              <Route path="/profile/reclamations" element={<Reclamations />} />
              <Route path="/details/:housing_name" element={<Produit housings={housings} />} />
              <Route path="/presentation" element={<Presentation />} />
              <Route path="/profile/orders" element={<Commandes />} />
              <Route path="*" element={<Error />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="CGU" element={<CGU />} />
              <Route path="/RGPD" element={<RGPD />} />
            </Routes>
          </Router>
        </BookingDatesContext.Provider>
      </LoginContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

