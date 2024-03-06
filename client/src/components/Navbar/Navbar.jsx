import React, { useState } from "react";
import "../component.css";
import LogoGustave from "../../assets/LogoGustave.png";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFirstName("");
    setLastName("");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validate user's email and password (you can add your own validation logic here)
    // If valid, set isLoggedIn to true and set first name and last name
    setIsLoggedIn(true);
    setFirstName("John"); // Replace with actual first name
    setLastName("Doe"); // Replace with actual last name
    handleModalClose();
  };

  return (
    <>
      <div className="navbar">
        <NavLink to="/">
          <img id="Logo" src={LogoGustave} alt="logo site" />
        </NavLink>

        <div className="Boutons">
          {isLoggedIn ? (
            <>
              <p>
                Bienvenue {firstName} {lastName}
              </p>
              <button onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <>
              <button onClick={handleLogin}>Se connecter</button>
              <NavLink to="/">
                <button>S'inscrire</button>
              </NavLink>
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <form onSubmit={handleFormSubmit}>
              <label id="id" htmlFor="email">
                Identifiant :
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label id="pass" htmlFor="password">
                Mot de passe :
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Valider</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
