import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";

const Commandes = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [reservationIds, setReservationIds] = useState([]); // État pour stocker les ID de réservation
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  {
    /*********************************************** */
  }
  useEffect(() => {
    (async () => {
      const full_token = localStorage.getItem("token");
      // si le token existe.
      if (full_token === null) {
        return;
      }

      const [_token, ...reservation_parts] = full_token.split(":");
      //on assosie l'adresse recuperer a la valeur de email

      const reservationIds = reservation_parts.join(":");
      setReservation(reservationIds);

      const response = await fetch("http://localhost:3630/booking", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservationIds: reservationIds,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        SetreservationIds(userData.housing_list);
      } else {
        // Gestion d'erreur
      }
    })();
  }, []);

  {
    /*********************************************** */
  }

  // useEffect(() => {
  //   // Effectuer une requête GET pour récupérer les ID de réservation
  //   fetch("http://localhost:3630/booking", {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.length === 0) {
  //         // Aucune réservation trouvée
  //         setError("Aucune commande en cours.");
  //       } else {
  //         // Réservations trouvées, met à jour l'état
  //         setReservationIds(data);
  //       }
  //     })
  //     .catch((error) => {
  //       // Gestion des erreurs
  //       setError("Erreur lors de la récupération des données.");
  //     })
  //     .finally(() => {
  //       // Fin du chargement
  //       setLoading(false);
  //     });
  // }, []); // Dépendance vide pour exécuter la requête une seule fois au montage

  // if (loading) {
  //   return <p>Chargement...</p>;
  // }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  return (
    <>
      <Navbar />
      <div className="titreCompte">
        <h2>Mon compte: </h2>
        <h3>
          {firstName} {lastName}
        </h3>
      </div>
      <div className="responsiveReverse">
        <span className="barHoriz"></span>
        <div className="testDiv">
          <div className="btnTitre">
            <NavLink to="/profile">
              <h3>Mes informations</h3>
            </NavLink>
            <NavLink to="/profile/orders">
              <h3>Mes commandes</h3>
            </NavLink>
            <NavLink to="/profile/reclamations">
              <h3>Mes réclamations </h3>
            </NavLink>
          </div>
          <span className="barVertical"></span>
          <div className="Formulaire">
            <h3>Mes commandes</h3>
            <h3>Vous n'avez pas de commandes</h3>
          </div>

          <div className="infosCommande">
            <p>Réservations : {reservationIds}</p>
            <p>Nombre de personnes : x</p>
            <p>Arrivée le xx/xx/xx . Départ au xx/xx/xx</p>
            <p>Prix : xxx€</p>
            <p>Lieu : xxxxxx</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Commandes;
