import React from 'react';
import '../component.css';
import { NavLink } from 'react-router-dom';

export const Searchbar = () => {
    const afficheDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // demmare a 0 par defaut
        const year = currentDate.getYear() 

        // Ajouter un 0 devant le jour et le mois s'ils sont inférieurs à 10
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    };

    return (
        <>
            <div className='searchbar'>
                <div className='destination'>
                    <label htmlFor="">Ou allez vous ?</label>
                    <input placeholder='ville'   type="text" />
                </div>

                <div className='row'>
                    <div className='horaires'>
                        <label htmlFor="">Depart</label>
                        <input  type="date" defaultValue={afficheDate()} />
                    </div>
                    <div className='horaires'>
                        <label htmlFor="">Arrivée</label>
                        <input  type="date" defaultValue={afficheDate()} />
                    </div>
                </div>

                <div className='row'>
                    <div className='nombrePersonnes'>
                        <label htmlFor="">Adultes</label>
                        <input placeholder='0' className='InputNb' type="text" />
                    </div>
                    <div className='nombrePersonnes'>
                        <label htmlFor="">Enfants</label>
                        <input placeholder='0' className='InputNb' type="text" />
                    </div>
                    <div className='nombrePersonnes'>
                        <label htmlFor="">Chambre</label>
                        <input placeholder='0' className='InputNb' type="text" />
                    </div>
                </div>
                <NavLink to="/recherche"><button id='btnSearch'>Rechercher</button></NavLink>
            </div>
        </>
    )
}
