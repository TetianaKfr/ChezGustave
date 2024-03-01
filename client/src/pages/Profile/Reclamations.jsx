import React from "react";
import "./Profile.css";
import { Navbar } from "../../components/Navbar/Navbar";

export default function Reclamations() {
  return (
    <>
      <Navbar />
      <div className="Texte">
        <h2>Mes réclamations</h2>
        <h3>Vous n'avez pas encore de réclamations</h3>
      </div>
    </>
  );
}
