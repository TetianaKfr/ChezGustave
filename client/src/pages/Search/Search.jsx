import React from 'react';
import './Search.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { Searchbar } from '../../components/SearchBar/Searchbar';
import { Footer } from '../../components/Footer/Footer';

//export default function Search() {
export const Search = () => {
    return (
        <>
            <Navbar />
            <Searchbar />
            <div className='produitDescription'>
                <div className='filtre'>
                    <p>Prix :</p>
                    <div class="PB-range-slider-div">
                        <input type="range" min="0" max="1000" class="PB-range-slider" id="myRange" />
                    </div>

                    <div>
                        <h4>Equipements :</h4>
                        <div className='row'><input type="checkbox" name='equip1' value="Equipement1" /> <p>Equipement 1</p></div>
                        <div className='row'><input type="checkbox" name='equip2' value="Equipement2" /> <p>Equipement 2</p></div>
                        <div className='row'><input type="checkbox" name='equip3' value="Equipement3" /> <p>Equipement 3</p></div>
                        
                    </div>
                    <div>
                        <h4>Catégories:</h4>
                        <div className='row'><input type="checkbox" name='categorie1' value="categorie1" /> <p>Categorie 1</p></div>
                        <div className='row'><input type="checkbox" name='categorie2' value="categorie2" /> <p>Categorie 2</p></div>
                        <div className='row'><input type="checkbox" name='categorie3' value="categorie3" /> <p>Categorie 3</p></div>
                        
                    </div>
                </div>

                <div className='card'>
                    <img src="" alt="img du logement" />
                    <div className='description'>
                        <h2>Nom</h2>
                        <p>Secteur</p>
                        <p>Description</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}