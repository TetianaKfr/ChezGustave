import React from 'react';
import './Search.css';

//export default function Search() {
export const Search = () => {
    return (
        <> 
        <div className='produitDescription'>
            <div className='filtre'><p>Filtre</p></div>
            <div className='card'> 
                <img src="" alt="img du logement" />
                <div className='description'>
                    <h2>Nom</h2>
                    <p>Secteur</p>
                    <p>Description</p>
                </div>
            </div>
        </div>
        </>
    )
}