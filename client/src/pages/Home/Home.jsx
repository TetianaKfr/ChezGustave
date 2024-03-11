import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import { NavLink } from 'react-router-dom';
import './Home.css';
import Banner from '../../assets/heroBanner.png';
import Banner2 from '../../assets/Chateau-a-louer.jpg';
import Background from '../../assets/BackgroundDestination.jpg';
import LogoGustave from "../../assets/LogoGustave.png";

export const Home = ({housings}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [Banner, Banner2]; // Array of images to display

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <>
            <div className='heroBannerContainer'>
                <div className='row navHome'>
                    <img id="Logo" src={LogoGustave} alt="logo site" />
                </div>

                <div className='row bannerbtn'>
                    <button className="prevButton" onClick={handlePrevImage}>{'<'}</button>
                    <NavLink to="/recherche">
                        <button id='BtnHomeReservation'>Reserver votre paradis !</button>
                    </NavLink>
                    <button className="nextButton" onClick={handleNextImage}>{'>'}</button>
                </div>

                <img className='heroBanner' src={images[currentImageIndex]} alt="Image d'accueil du site" />
            </div>

            <div className='wrapper displayHome'>
                <div className='backgColor' style={{ backgroundImage: `url(${Background})` }}>
                    <h2 className='Taille'>Voyager en France</h2>
                    <p className='Taille2'>Pourquoi pas ici?</p>
                    <div className='displayVoyage' >
                        <div>
                            <img className='photoDestination' src={Banner} alt="" />
                            <p className='backgroundColor'>Le Havre</p>
                        </div>
                        <div>
                            <img className='photoDestination' src={Banner} alt="" />
                            <p className='backgroundColor'>Lyon</p>
                        </div>
                        <div>
                            <img className='photoDestination' src={Banner} alt="" />
                            <p className='backgroundColor'>Montpellier</p>
                        </div>
                        <div>
                            <img className='photoDestination' src={Banner} alt="" />
                            <p className='backgroundColor'>Strasbourg</p>
                        </div>
                    </div>
                </div>

                <div className='coupCoeur'>
                    <h2 className='colorText'>Laissez-vous tenter par nos coups de coeur</h2>
                    <p className='colorText'>Nos locations les mieux notées</p>
                    <div className='displayCoeur'>
                        <div className='cardCoeur'>
                            <img className='vignetteCoeur' src="" alt="" />
                            <p>Voir le descriptif</p>
                        </div>
                        <div className='cardCoeur'>
                            <img className='vignetteCoeur' src="" alt="" />
                            <p>Voir le descriptif</p>
                        </div>
                        <div className='cardCoeur'>
                            <img className='vignetteCoeur' src="" alt="" />
                            <p>Voir le descriptif</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
