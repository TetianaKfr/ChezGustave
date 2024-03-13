import React, { useState, useEffect } from 'react';
import '../component.css';
import { NavLink } from 'react-router-dom';

export const Searchbar = ({ selectedCategories, selectedTypes, price_range_end }) => {
    const [date_start, setDate_start] = useState('');
    const [date_end, setDate_end] = useState('');

    const searchFiltre = async () => {
        try {
            const response = await fetch("http://localhost:3630/housings/search", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categories: {
                        with: [selectedCategories || undefined],
                    },
                    types: {
                        with: [selectedTypes || undefined],
                    },
                    date_start,
                    date_end,
                    price_range_end
                })
            });

            if (response.ok) {
                const filtreData = await response.json();
                console.log(filtreData);
            } else {
                console.error("Error fetching housings:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        searchFiltre();
    }, [selectedCategories, selectedTypes, date_start, date_end, price_range_end]);

    const handleDepartDateChange = (e) => {
        setDate_start(e.target.value);
    };

    const handleArriverDateChange = (e) => {
        setDate_end(e.target.value);
    };

    return (
        <div className='searchbar'>
            <div className='date'>
                <div className='row'>
                    <label htmlFor="date_start">Départ :</label>
                    <input
                        type="date"
                        id="departureDate"
                        value={date_start}
                        onChange={handleDepartDateChange}
                    />
                </div>

                <div className='row'>
                    <label htmlFor="date_end">Arrivée :</label>
                    <input
                        type="date"
                        id="arrivalDate"
                        value={date_end}
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
