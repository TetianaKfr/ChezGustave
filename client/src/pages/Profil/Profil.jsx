import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  // State variables for user data
  const [firstName, setFirstName] = useState("Alice");
  const [lastName, setLastName] = useState("Dupont");
  const [email, setEmail] = useState("alice.dupont@example.com");
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
    <div className="profile">
      <h1>Mon compte</h1>
      <h2>
        {firstName} {lastName}
      </h2>
      <div className="profile-info">
        <h3>Mes informations</h3>
        <p>Nom : {firstName}</p>
        <p>Prénom : {lastName}</p>
        <p>Email : {email}</p>
        <h3>Changement de mot de passe</h3>
        <p>Mot de passe actuel :</p>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <p>Nouveau mot de passe :</p>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <p>Confirmer le nouveau mot de passe :</p>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Valider</button>
        <p className="password-message">{passwordMessage}</p>
      </div>
      <div className="profile-orders">
        <h3>Mes commandes</h3>
        <p>Vous n'avez pas encore passé de commande.</p>
      </div>
      <div className="profile-claims">
        <h3>Mes réclamations</h3>
        <p>Vous n'avez pas encore fait de réclamation.</p>
      </div>
    </div>
  );
}

export default Profile;
