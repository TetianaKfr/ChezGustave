import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Searchbar } from '../../components/SearchBar/Searchbar';
import { Footer } from '../../components/Footer/Footer';
import './Home.css'
import Banner from '../../assets/heroBanner.png';
import Background from '../../assets/BackgroundDestination.jpg'
import { useEffect } from 'react';

export const Home = () => {
    const [errorMessage, setErrorMessage] = useState('');

    // Fonction pour récupérer la liste des utilisateurs
    const listeUsers = async () => {
        try {
            console.log('Début de la fonction listeUsers');
            const userList = await fetch("http://localhost:3630/users", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            });
            console.log('Après la requête fetch');
            if (userList.ok) {
                const usersData = await userList.json();
                console.log("Liste des utilisateurs:", usersData);
            } else {
                console.log("Erreur lors de la récupération des utilisateurs:", userList);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
        }
    };

    //appel de la fonction liste
    useEffect(() => {
        listeUsers(); // Appel de la fonction listeUsers lors du chargement du composant Home
    }, []); 
    // Le tableau vide en second argument signifie que useEffect s'exécutera une seule fois après le premier rendu

    return (
        <>
            <Navbar />
            <img className='heroBanner' src={Banner} alt="Image d'accueil du site" />
            <Searchbar />
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
    )
}