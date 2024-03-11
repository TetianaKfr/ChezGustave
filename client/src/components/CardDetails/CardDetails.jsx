import React from "react";
import "../component.css";
import pictoVille from "../../assets/pictoVille.png";

export const CardDetails = ({housing}) => {
  return (
    <>
      <div className="cardComplete">
        <div className="CardDetails">
          <img className="photoLogement" src="" alt="photo du logement" />
        </div>
        <span className="UseForCSS"></span>
        <div className="textCard">
          <div className="row gap">
            <h2>{housing}</h2>
            <div className="divPicto">
              <img src={pictoVille} alt="pictogramme ville" />
              <p>catégories</p>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            ipsum ut deleniti. Ducimus, eos! Saepe laboriosam culpa recusandae
            repellat quasi illum deleniti. Iste nostrum mollitia assumenda
            beatae maioreipsum dolor sit amet consectetur adipisicing elit.
            Voluptatem ipsum ut deleniti. Ducimus, eos! Saepe laboriosam culpa
            recusandae repellat quasi illum deleniti. Iste nostrum mollitia
            assumenda beatae maiores temporibus voluptatum.Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Voluptatem ipsum ut deleniti.
            Ducimus, eos! Saepe laboriosam culpa recusandae repellat quasi illum
            deleniti. Iste nostrum mollitia assumenda beatae maiores temporibus
            voluptatum. Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Sunt alias fugiat nam facilis tempora, omnis neque debitis
            voluptate aut quidem distinctio quia exercitationem dolore quas
            minima error, dolorum nostrum doloremque hic nihil numquam tenetur
            at! Praesentium vero tempore neque deleniti excepturi dicta, nemo
            cupiditate atque, sit quidem explicabo libero, maxime expedita
            consequuntur id laudantium vel. Beatae, voluptatem excepturi, sed
            vero consectetur aspernatur rem fugiat quidem quae commodi placeat
            animi quam molestiae saepe sunt minima doloremque, totam culpa
            perspiciatis pariatur optio! Maxime dignissimos provident eum,
            ratione neque officia ut sunt est libero esse, dolor laboriosam
            minus, sed dicta perspiciatis deleniti ipsa?
          </p>
          <p className="row">Equipements : </p>
        </div>
      </div>
    </>
  );
};
