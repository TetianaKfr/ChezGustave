import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { NavLink } from 'react-router-dom';
import './Home.css';
import Banner from '../../assets/heroBanner.png';
import Banner2 from '../../assets/Chateau-a-louer.jpg';
import Background from '../../assets/BackgroundDestination.jpg';
import LogoGustave from "../../assets/LogoGustave.png";
import { useContext } from 'react';
import LoginContext, { SessionState } from "../../LoginContext";


export const Home = ({ housings }) => {
    // gérer les messages d'erreur
    const [errorMessage, setErrorMessage] = useState('');
    // index de l'image actuellement affichée dans le diaporama
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // images à afficher dans le diaporama
    const images = [Banner, Banner2];
    // stocker les hébergements aléatoires à afficher
    const [randomHousings, setRandomHousings] = useState([]);
    // coup de coeur random
    const [randomCoeur, setRandomCoeur] = useState([]);
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

    // Utiliser useEffect pour gérer le diaporama
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000);
    }, []);

    // Utiliser useEffect pour sélectionner 4 hébergements aléatoires lorsque la liste de hébergements change
    useEffect(() => {
        // Mélanger le tableau d'hébergements
        const hazardHousings = housings.sort(() => Math.random() - 0.5);
        // Sélectionner les 4 premiers hébergements
        const piocheHousings = hazardHousings.slice(0, 4);
        // Mettre à jour l'état avec les hébergements sélectionnés
        setRandomHousings(piocheHousings);
        const Coeurhousing = hazardHousings.slice(5, 8)
        setRandomCoeur(Coeurhousing);
    }, [housings]);

    // Fonction pour passer à l'image suivante dans le diaporama
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Fonction pour passer à l'image précédente dans le diaporama
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <>
            <div className='heroBannerContainer'>
                <Navbar />
                <div className='row bannerbtn'>
                    <button className="prevButton" onClick={handlePrevImage}>{'<'}</button>
                    <NavLink to="/recherche">
                        <button id='BtnHomeReservation'>Reserver votre paradis !</button>
                    </NavLink>
                    <button className="nextButton" onClick={handleNextImage}>{'>'}</button>
                </div>
                <img className='heroBanner' src={images[currentImageIndex]} alt="Image d'accueil du site" />
            </div>
            {isLoggedIn==SessionState.NotConnected ? (
            <>
                <p>Vous devez etre connecté pour consulter nos logements</p>
            </>
          ) : (
            <>
              <div className='wrapper displayHome'>
                <div className='backgColor' style={{ backgroundImage: `url(${Background})` }}>
                    <h2 className='Taille'>Voyager en France</h2>
                    <p className='Taille2'>Pourquoi pas ici?</p>
                    <div className='displayVoyage'>
                        {randomHousings.map((housing, index) => (
                            <div key={index}>
                                <NavLink to={`/details/${housing.name}`}>
                                <img className='photoDestination' src={"http://localhost:3630/uploads/"+housing.images_urls[0]} alt="" />
                                </NavLink>
                                <p className='backgroundColor'>{housing.area}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='coupCoeur'>
                    <h2 className='colorText'>Laissez-vous tenter par nos coups de coeur</h2>
                    <p className='colorText'>Nos locations les mieux notées</p>
                    <div className='displayCoeur'>
                    {randomCoeur.map((housing, index) => (
                        <div className='cardCoeur'>
                            <NavLink to={`/details/${housing.name}`}>
                        <img className='vignetteCoeur' src={"http://localhost:3630/uploads/"+housing.images_urls[0]} alt={housing.area} />      
                            </NavLink>
                        <p>Voir le descriptif</p>
                    </div>
                        ))}
                    </div>
                </div>
            </div>
            </>
          )}
            <Footer />
        </>
    );
};
