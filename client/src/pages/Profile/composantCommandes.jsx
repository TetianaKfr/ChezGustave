import React, { useState, useEffect } from "react";

const CompCommande = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const response = await fetch("http://localhost:3630/bookings", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrderItems(data); // Remplacez par les vraies données de vos réservations
        } else {
          setError("Erreur lors de la récupération de vos réservations.");
        }
      } catch (err) {
        setError("Erreur réseau. Veuillez réessayer plus tard.");
      }
    };

    fetchMyBookings();
  }, []);

  return (
    <div>
      <h1>Mes Réservations</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {orderItems.map((item) => (
            <li key={item}>
              {item.name} - {item.date} - {item.price.toFixed(2)}€
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompCommande;
