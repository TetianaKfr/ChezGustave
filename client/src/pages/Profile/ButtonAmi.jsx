import React, { useState } from "react";
import "./Profile.css";

const ButtonAmi = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [friendPrenom, setFriendPrenom] = useState("");
  const [friendTel, setFriendTel] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [friendMessage, setFriendMessage] = useState("");

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send friend request)
    console.log("Friend Name:", friendName);
    console.log("Friend Email:", friendEmail);
    console.log("Friend Message:", friendMessage);
    // You can add your logic here to send the friend request
    // (e.g., make an API call, update state, etc.)
    setIsModalOpen(false);
  };

  return (
    <div>
      <button id="buttonAmi" onClick={handleButtonClick}>
        Ajouter un ami
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Ajouter un ami</h2>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="friendName">Nom de l'ami :</label>
              <input
                type="text"
                id="friendName"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                required
              />

              <label htmlFor="friendPrenom">Prénom de l'ami :</label>
              <input
                type="text"
                id="friendPrenom"
                value={friendPrenom}
                onChange={(e) => setFriendPrenom(e.target.value)}
                required
              />

              <label htmlFor="friendTel">Téléphone de l'ami :</label>
              <input
                type="text"
                id="friendTel"
                value={friendTel}
                onChange={(e) => setFriendTel(e.target.value)}
                required
              />

              <label htmlFor="friendEmail">Email de l'ami :</label>
              <input
                type="email"
                id="friendEmail"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                required
              />
              <label htmlFor="friendMessage">Message :</label>
              <textarea
                id="friendMessage"
                value={friendMessage}
                onChange={(e) => setFriendMessage(e.target.value)}
                rows="4"
                required
              ></textarea>
              <button type="submit">Envoyer</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonAmi;
