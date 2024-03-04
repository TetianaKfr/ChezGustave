import React, { useState } from "react";
import "./Profile.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import Image from "../../assets/paradisiaque.jpeg";

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
        <div className="reverse">
          <div className="rectangle">
            <div className="bottom-side"></div>
          </div>
          <div className="profile">
            <div className="remettre">
              <div className="bar">
                <div className="colonne2">
                  <h3>
                    <NavLink to="/profile">Mes informations</NavLink>
                  </h3>
                </div>
                <div className="colonne2">
                  <h3>Mes commandes</h3>
                </div>
                <div className="colonne2">
                  <h3>
                    <NavLink to="/profile/reclamations">
                      Mes réclamations
                    </NavLink>
                  </h3>
                </div>
              </div>
              <div className="vertical-side"></div>
            </div>
          </div>
          <div className="zoneDeCommandes">
            <div className="Texte">
              <h2>Mes commandes</h2>
              <h3>Vous n'avez pas de commandes</h3>
              <h3>Vous avez x commandes en cours</h3>
            </div>
            <div className="infosCommande">
              <p>Nombre de personnes : x</p>
              <p>Date : xx/xx/xx</p>
              <p>Prix : xxx€</p>
              <p>Lieu : xxxxxx</p>
              <p>Trajet : Avion / Bus</p>
            </div>
            <img id="avion" src={Image}></img>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
