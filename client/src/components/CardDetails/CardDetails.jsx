import React from "react";
import "../component.css";
import pictoVille from "../../assets/pictoVille.png";

export const CardDetails = ({housing}) => {
  return (
    <>
      <div className="cardComplete">
        <div className="CardDetails">
          <img className="photoLogement" src={"http://localhost:3630/uploads/"+housing.images_urls[0]} alt="photo du logement" />
        </div>
        <span className="UseForCSS"></span>
        <div className="textCard">
          <div className="row gap">
            <h2>{housing.area}</h2>
            <div className="divPicto">
              <img src={pictoVille} alt="pictogramme ville" />
              <p>{housing.category}</p>
            </div>
          </div>
          <p>
            {housing.description}
          </p>
          <p>prix: {housing.medium_price}</p>
          <p className="row"> Chambres: {housing.bedroom_count}  / Salle de bain: {housing.bathroom_count}  </p>
        </div>
      </div>
    </>
  );
};
