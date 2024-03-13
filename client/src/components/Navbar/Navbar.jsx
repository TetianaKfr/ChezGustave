import React, { useState, useEffect, useContext } from "react";
import "../component.css";
import LogoGustave from "../../assets/LogoGustave.png";
import { NavLink } from "react-router-dom";
import LoginContext, { SessionState } from "../../LoginContext";

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  useEffect( () => {
    // On récupère le token complet depuis le localStorage.
    const full_token = localStorage.getItem("token");
    // si le token existe.
    if (full_token) {
      //decoupe du token pour recup l'adresse mail , on recupere la partie apres : 
      const [_token, ...email_parts] = full_token.split(':');
      //on assosie l'adresse recuperer a la valeur de email
      const email = email_parts.join(':');
      // on met a jour le setter
      setEmail(email);
      (async () => {
        try {
          const response = await fetch("http://localhost:3630/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ email }),
          });

          if (response.ok) {
            if ((await response.json()).admin) {
              setIsLoggedIn(SessionState.Admin);
            } else {
              setIsLoggedIn(SessionState.Connected);
            }
          } else {
            console.error("erreur reponse", response);
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, []);
  // Les crochets vides [] signifient que cette fonction ne dépend d'aucune variable et ne doit être exécutée qu'une seule fois.

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(SessionState.NotConnected);
    localStorage.removeItem("token");
  };


  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3630/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        handleModalClose();
        try {
          const response = await fetch("http://localhost:3630/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ email }),
          });

          if (response.ok) {
            if ((await response.json()).admin) {
              setIsLoggedIn(SessionState.Admin);
            } else {
              setIsLoggedIn(SessionState.Connected);
            }
          } else {
            console.error("erreur reponse", response);
          }
        } catch (error) {
          console.error(error);
        };
      } else if (response.status === 401) {
        setErrorMessage('Mail ou mot de passe incorrect');
      } else {
        setErrorMessage('Une erreur est survenue lors de la connexion');
      }
    } catch (error) {
      setErrorMessage('Erreur de connexion');
    }
  };


  return (
    <>
      <div className="navbar">
        <NavLink to="/">
          <img id="Logo" src={LogoGustave} alt="logo site" />
        </NavLink>

        <div className="Boutons">
          {isLoggedIn!=SessionState.NotConnected ? (
            <>
              <p className="welcomeMsg">Bienvenue {email}</p>
              <button onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <>
              <button onClick={handleLogin}>Se connecter</button>
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}></span>
            <form onSubmit={handleFormSubmit}>
              <label className="" htmlFor="email">Identifiant :</label>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Mot de passe :</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Valider</button>
            </form>
            {errorMessage && (
              <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
