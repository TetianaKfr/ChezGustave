import React from 'react';
import '../component.css';
import { NavLink } from 'react-router-dom';

export const Searchbar = () => {


    return (
        <>
            <div className='searchbar'>
                {/* <div className='date'>
                    <div className='row'>
                        <label htmlFor="">Départ :</label>
                        <input type="date"  />
                    </div>

                    <div className='row'>
                        <label htmlFor="">Arrivée :</label>
                        <input type="date"/>
                    </div>
                </div> */}
                
                <NavLink to="/recherche">
                    <button id='btnSearch'>Louez votre paradis </button>
                </NavLink>
            </div>
        </>
    )
}
