import React from 'react';
import './Search.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { Searchbar } from '../../components/SearchBar/Searchbar';
import { Footer } from '../../components/Footer/Footer';
import { CardDetails } from '../../components/CardDetails/CardDetails';
import { useState } from 'react';
import { useEffect } from 'react';

//export default function Search() {
export const Search = () => {
    const [housings, setHousings] = useState([]);
    // State pour stocker la valeur actuelle du slider
    const [sliderValue, setSliderValue] = useState(0);

    // Fonction pour mettre à jour la valeur actuelle du slider
    const handleSliderChange = (e) => {
        setSliderValue(parseInt(e.target.value));
    };

 // Fetch logement  
 useEffect(() => {
    const fetchHousings = async () => {
        try {
            const response = await fetch("http://localhost:3630/housings", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setHousings(data);
                console.log(data)
            } else {
                console.error("Error fetching housings");
            }
        } catch (error) {
            console.error("Error fetching housings:", error);
        }
    };

    fetchHousings();
}, []);

    return (
        <>
            <Navbar />
            <Searchbar />
            <div className='produitDescription'>
                <div className='filtre'>
                    <h3>Filtres</h3>
                    <p>Prix : {sliderValue} € max</p>
                    <div >
                        {/* Ajoutez des onChange pour mettre à jour les valeurs minimale et maximale */}
                        <input type="range" min="0" max="5000" className="PB-range-slider" id="myRange" value={sliderValue} onChange={handleSliderChange} />
                        
                    </div>

                    <div>
                        <h4>Equipements :</h4>
                        <div className='row'><input type="checkbox" name='equip1' value="Equipement1" /> <p>Piscine</p></div>
                        <div className='row'><input type="checkbox" name='equip2' value="Equipement2" /> <p>SPA</p></div>
                        <div className='row'><input type="checkbox" name='equip3' value="Equipement3" /> <p>Wifi</p></div>

                    </div>
                    <div>
                        <h4>Catégories:</h4>
                        <div className='row'><input type="checkbox" name='categorie1' value="categorie1" /> <p>Montagne</p></div>
                        <div className='row'><input type="checkbox" name='categorie2' value="categorie2" /> <p>Campagne</p></div>
                        <div className='row'><input type="checkbox" name='categorie3' value="categorie3" /> <p>Bord de mer</p></div>
                    </div>
                    <div>
                        <h4>Type:</h4>
                        <div className='row'><input type="checkbox" name='type1' value="type1" /> <p> Maison</p></div>
                        <div className='row'><input type="checkbox" name='type2' value="type2" /> <p>Appartement</p></div>
                        <div className='row'><input type="checkbox" name='type3' value="type3" /> <p>Chateau</p></div>
                    </div>
                </div>

                <div className='card'>
                    {housings.map((housing, index) => (
                        <CardDetails key={index} housing={housing} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}
