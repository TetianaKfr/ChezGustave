import React from 'react';
import './Search.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { Searchbar } from '../../components/SearchBar/Searchbar';
import { Footer } from '../../components/Footer/Footer';
import { CardDetails } from '../../components/CardDetails/CardDetails';
import { useState } from 'react';
import { useEffect } from 'react';

//export default function Search() {
export const Search = ({ housings }) => {

    // State pour stocker la valeur actuelle du slider
    const [sliderValue, setSliderValue] = useState(0);

    // Fonction pour mettre à jour la valeur actuelle du slider
    const handleSliderChange = (e) => {
        setSliderValue(parseInt(e.target.value));
    };

    return (
        <>
            <Navbar />
            <Searchbar />
            <div className='produitDescription'>
                <div className='filtre'>
                    <h3>Filtres</h3>
                    <p>Prix : {sliderValue} € max</p>
                    <div >
                        <input type="range" min="0" max="5000" className="PB-range-slider" id="myRange" value={sliderValue} onChange={handleSliderChange} />
                    </div>

                    <div>
                        <h4>Catégories:</h4>
                        <div className='row'>
                            <input type="checkbox" name='categorie1' value="categorie1" /> <p>Montagne</p>
                        </div>
                        <div className='row'>
                            <input type="checkbox" name='categorie2' value="categorie2" /> <p>Campagne</p>
                        </div>
                        <div className='row'>
                            <input type="checkbox" name='categorie3' value="categorie3" /> <p>Bord de mer</p>
                        </div>
                        <div className='row'>
                            <input type="checkbox" name='categorie4' value="categorie4" /> <p>Ville</p>
                        </div>
                    </div>

                    <div>
                        <h4>Type:</h4>
                        <div className='row'>
                            <input type="checkbox" name='type1' value="type1" />
                            <p> Maison</p>
                        </div>
                        <div className='row'>
                            <input type="checkbox" name='type2' value="type2" />
                            <p>Villa</p>
                        </div>
                        <div className='row'>
                            <input type="checkbox" name='type3' value="type3" />
                            <p>Chateau</p>
                        </div>
                        <div className='row'>
                            <input type="checkbox" name='type4' value="type4" />
                            <p>Manoir</p>
                        </div>
                        <div className='row'>
                            <input type="checkbox" name='type5' value="type5" />
                            <p>Atypique</p>
                        </div>
                        <div className='row'>
                            <input type="checkbox" name='type6' value="type6" />
                            <p>Chalet</p>
                        </div>
                        <div className='row'>
                            <input type="checkbox" name='type7' value="type7" />
                            <p>Appartement</p>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    {housings.map((housing, index) => (
                        <CardDetails key={housing.id} housing={housing} />
                    ))}

                </div>
            </div>
            <Footer />
        </>
    )
}
