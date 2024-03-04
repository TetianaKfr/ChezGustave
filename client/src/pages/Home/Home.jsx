import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Searchbar } from '../../components/SearchBar/Searchbar';
import { Footer } from '../../components/Footer/Footer';
import './Home.css'
import Banner from '../../assets/PresentationLake.jpg';

export const Home = () => {
    return (
        <>
            <Navbar />
            <img className='heroBanner' src={Banner} alt="" />
            <Searchbar />
            <div className='wrapper'>

                <div className='backgColor'>
                    <h2>Voyager en France</h2>
                    <p>Pourquoi pas ici?</p>
                    <div className='displayVoyage'>
                        <div>
                            <img className='photoDestination' src="" alt="" />
                            <p>Lieu</p>
                        </div>
                        <div>
                            <img className='photoDestination' src="" alt="" />
                            <p>Lieu</p>
                        </div>
                        <div>
                            <img className='photoDestination' src="" alt="" />
                            <p>Lieu</p>
                        </div>
                        <div>
                            <img className='photoDestination' src="" alt="" />
                            <p>Lieu</p>
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
    )
}