import React, { useState, useEffect } from 'react';
import '../component.css';
import { NavLink } from 'react-router-dom';

export const Searchbar = ({housings, selectedCategories, selectedTypes, price_range_end, setResultSearch }) => {
 //State des dates a visualiser / commander
    const [date_start, setDate_start] = useState(undefined);
    const [date_end, setDate_end] = useState(undefined);

    const searchFiltre = async () => {
        //lors du submit recherche
        try {
            const response = await fetch("http://localhost:3630/housings/search", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // envois des catégorie à la requete
                    categories: {
                        with: selectedCategories.length==0 ? undefined : selectedCategories,
                    },
                    // envois des types cocher
                    types: {
                        with: selectedTypes.length==0 ? undefined : selectedTypes
                    },

                    // envoi des dates au format attendu
                    date_start: date_start.toDateString(),
                    date_end: date_end.toDateString(),

                    //renvoi le prix max 
                    price_range_end
                })
            });

            if (response.ok) {
                //resultat de la recherche: 
                //on obtient une liste de nom , on cherche une correspondance des 
                //noms pour y assosier les details 
                setResultSearch((await response.json()).map(
                    name => housings.find(housing=>housing.name==name)
                ));
            } else {
                console.error("Error fetching housings:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
// a chache changement d'etat de l'input date , la recuperer et la transformer au format date
    const handleDepartDateChange = (e) => {
        setDate_start(e.target.valueAsDate);
    };

    const handleArriverDateChange = (e) => {
        setDate_end(e.target.valueAsDate);
    };

    return (
        <div className='searchbar'>
            <div className='date'>
                <div className='row'>
                    <label htmlFor="date_start">Départ :</label>
                    <input
                        type="date"
                        id="departureDate"
                        onChange={handleDepartDateChange}
                    />
                </div>

                <div className='row'>
                    <label htmlFor="date_end">Arrivée :</label>
                    <input
                        type="date"
                        id="arrivalDate"
                        onChange={handleArriverDateChange}
                    />
                </div>
            </div>

            <NavLink to="/recherche">
                <button onClick={searchFiltre} id='btnSearch'>Louez votre paradis </button>
            </NavLink>
        </div>
    );
};
