import React from "react";
import "../component.css";
import LogoFooter from "../../assets/logoFooter.png";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className="gap">
        <div className="leftColumn">
          <img id="logoFooter" src={LogoFooter} alt="logo du footer" />
          <p>© chez Gustave. Tous droits réservés.</p>
        </div>
        <div className="column espacement">
          <div className="row gap">
            <div className="column">
              <h4>Plan du site</h4>
              <NavLink to="/">
                <p>Accueil</p>{" "}
              </NavLink>
              <NavLink to="/presentation">
                <p>Presentation</p>
              </NavLink>
              <NavLink to="/recherche">
                <p>Page de recherche</p>
              </NavLink>
            </div>
            <div className="column">
              <NavLink to="/profile">
                <h4>Mon profil</h4>
              </NavLink>
              <p>Mes informations</p>
              <p>Mes commandes</p>
              <p>Mes réclamations</p>
            </div>
          </div>
          <span className="decoration"></span>

          <div className="row liens">
            <NavLink to="/">
              <p>GDPR </p>
            </NavLink>
            <NavLink to="/mentions-legales">
              <p>Mentions légales</p>
            </NavLink>
            <NavLink to="/CGU">
              <p>CGU</p>
            </NavLink>
          </div>
        </div>
      </footer>
    </>
  );
};
