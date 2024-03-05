import React, { useState } from "react";
import "./Profile.css";
import { NavLink } from "react-router-dom";
import Commandes from "./Commandes";
import Reclamations from "./Reclamations";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";

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
                        placeholder="Nom"
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
      <div className="formulaireResponsive">
        <div className="profile-info">
          <h3>Mes informations</h3>
          <form>
            <div className="nomprenom">
              <div className="colonne">
                <label id="labelnom" htmlFor="nom">
                  Nom :
                </label>
                  <input className="input"
                    type="text"
                    id="nom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Prenom"
                  />
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
                  placeholder="prenom"
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
                placeholder="votre mail"
              />
            </div>
          </form>
            <h3 className="chgmt">Changement de mot de passe</h3>
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
      <Footer />
    </>
  );
}

export default Profile;
