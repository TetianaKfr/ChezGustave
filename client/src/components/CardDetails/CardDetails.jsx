import React from "react";
import "../component.css";
import pictoVille from "../../assets/pictoVille.png";
import { Link } from "react-router-dom";


export const CardDetails = ({ housing }) => {
  return (
    <>
      <div className="cardComplete">
        <div className="CardDetails">
          <img className="photoLogement" src={"http://localhost:3630/uploads/" + housing.images_urls[0]} alt="photo du logement" />
        </div>
        <div className="textCard">
          <div className="row gap mobilVersion">
            <h2>{housing.name}</h2>
            <div className="divPicto">
            <p>{housing.type}</p>
              <img src={pictoVille} alt="pictogramme ville" />
              <p>{housing.category}</p>
            </div>
          </div>
          <p className="description">
            {housing.description}
          </p>
          <p className="row"><span>Chambres:</span>  {housing.bedroom_count} </p>

          <div className="row">          
            <p><span>Lieu:</span> {housing.area}</p>
          </div>

          <Link to={{ pathname: "/details/" + housing.name }} state={housing} >
            <button id="boutton-afficher-details">Voir les informations</button>
          </Link>
        </div>
      </div>
    </>
  );
};
