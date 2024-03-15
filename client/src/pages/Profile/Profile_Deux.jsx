import React, { useState, useEffect } from "react";

function Profile_Deux() {
  // State variables for user data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Simulate fetching user data (replace with actual API call)
  useEffect(() => {
    // Replace with your API endpoint to fetch user data
    (async () => {
      const full_token = localStorage.getItem("token");
      // si le token existe.
      if (full_token === null) {
        return;
      }

      const [_token, ...email_parts] = full_token.split(":");
      //on assosie l'adresse recuperer a la valeur de email

      const email = email_parts.join(":");
      setEmail(email);

      const response = await fetch("http://localhost:3630/user", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        setLastName(userData.last_name);
        setFirstName(userData.first_name);
      } else {
        // Gestion d'erreur
      }
    })();
  }, []);
  // Empty dependency array to fetch data once on component mount

  return (
    <div>
      <div className="monProfil">
        <h2>Mon profil</h2>
        <p>Prénom : {firstName}</p>
        <p>Nom : {lastName}</p>
        <p>Email : {email}</p>
      </div>
    </div>
  );
}

export default Profile_Deux;
