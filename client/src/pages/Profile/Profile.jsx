import React, { useState } from "react";
import "./Profile.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
import Commandes from "./Commandes";
import Reclamations from "./Reclamations";

function Profile() {
  // State variables for user data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // State variables for password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State variable for password change feedback
  const [passwordMessage, setPasswordMessage] = useState("");

  // Function to handle password change
  const handleChangePassword = () => {
    // Validate current password
    if (currentPassword !== "123456") {
      setPasswordMessage("Mot de passe actuel incorrect");
      return;
    }
    // Validate new password
    if (newPassword.length < 6) {
      setPasswordMessage(
        "Le nouveau mot de passe doit avoir au moins 6 caractères"
      );
      return;
    }
    // Validate confirm password
    if (newPassword !== confirmPassword) {
      setPasswordMessage("Les mots de passe ne correspondent pas");
      return;
    }
    // Update password and clear inputs
    setPasswordMessage("Mot de passe changé avec succès");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

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
                <h3>
                  <NavLink to="/profile/orders">Mes commandes</NavLink>
                </h3>
              </div>
              <div className="colonne2">
                <h3>
                  <NavLink to="/profile/reclamations">Mes réclamations</NavLink>
                </h3>
              </div>
              <div className="vertical-side"></div>
            </div>
          </div>
          <div className="droite">
            <div className="profile-info">
              <h3>Mes informations</h3>
              <form>
                <div className="nomprenom">
                  <div className="colonne">
                    <label id="labelnom" htmlFor="nom">
                      Nom :
                    </label>
                    <div className="input">
                      <input
                        type="text"
                        id="nom"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Dupont" // Ajout d'un placeholder avec la valeur initiale
                      />
                    </div>
                  </div>
                  <div className="colonne">
                    <label id="labelprenom" htmlFor="prenom">
                      Prénom :
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Jean" // Ajout d'un placeholder avec la valeur initiale
                    />
                  </div>
                </div>
                <div className="colonne">
                  <label id="labelEmail" htmlFor="email">
                    Email :
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jeandupont@gmail.com" // Ajout d'un placeholder avec la valeur initiale
                  />
                </div>
              </form>
              <div className="chgmt">
                <h3>Changement de mot de passe</h3>
              </div>
              <div className="motsDP">
                <div className="colonne">
                  <p>Mot de passe actuel :</p>
                  <div className="input">
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="colonne">
                  <p>Nouveau mot de passe :</p>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="btnConfirmer">
                <button onClick={handleChangePassword}>Confirmer</button>
              </div>
              <p className="password-message">{passwordMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
