import React, { useState } from "react";
import "./Profile.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { NavLink } from "react-router-dom";

export default function Commandes() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <>
      <Navbar />

      <div className="gauche">
        <h2>Mon compte</h2>
        <h2>
          {firstName} {lastName}
        </h2>
        <div className="rectangle">
          <div className="bottom-side"></div>
        </div>
        <div className="profile">
          <div className="remettre">
            <div className="bar">
              <div className="colonne2">
                <h3>
                  <NavLink to="/profile/info">Mes informations</NavLink>
                </h3>
              </div>
              <div className="colonne2">
                <h3>Mes commandes</h3>
              </div>
              <div className="colonne2">
                <h3>
                  <NavLink to="/profile/reclamations">Mes réclamations</NavLink>
                </h3>
              </div>
              <div className="vertical-side"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="Texte">
        <h2>Mes réclamations</h2>
        <h3>Vous n'avez pas de réclamations</h3>
      </div>
    </>
  );
}
