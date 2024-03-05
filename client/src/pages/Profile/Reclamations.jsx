import React, { useState } from "react";
import "./Profile.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";

export default function Commandes() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <>
      <Navbar />

      <div className="titreCompte">
        <h2>Mon compte: </h2>
        <h3>{firstName} {lastName}</h3>
      </div>

      <div className="responsiveReverse">
        <span className="barHoriz"></span>
        <div className="testDiv">
          <div className="btnTitre">
            <NavLink to="/profile"><h3>Mes informations</h3></NavLink>
            <NavLink to="/profile/orders"><h3>Mes commandes</h3></NavLink>
            <NavLink to="/profile/reclamations"> <h3>Mes réclamations </h3></NavLink>
          </div>
          <span className="barVertical"></span>
          <div className="Formulaire">
            <h3>Mes réclamations</h3>
            <h3>Vous n'avez pas de réclamations</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
