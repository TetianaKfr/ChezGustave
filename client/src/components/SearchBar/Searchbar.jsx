import React, { useContext } from 'react';
import '../component.css';
import { NavLink } from 'react-router-dom';
import BookingDatesContext from "../../BookingDatesContext";
import jsDateToHtmlDate from "../../JsDateToHtmlDate";

export const Searchbar = ({housings, selectedCategories, selectedTypes, price_range_end, setResultSearch }) => {
    const { bookingDates, setBookingDates } = useContext(BookingDatesContext);

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
                    date_start: bookingDates.start == undefined ? undefined : bookingDates.start.toDateString(),
                    date_end: bookingDates.end == undefined ? undefined : bookingDates.end.toDateString(),
                    // envoi le prix max 
                    price_range_end,
                })
            });

            if (response.ok) {
                // resultat de la recherche: 
                // on obtient une liste de nom , on cherche une correspondance des 
                // noms pour y assosier les details 
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

    return (
        <div className='searchbar'>
            <div className='date'>
                <div className='displayModulable'>
                    <label htmlFor="date_start">Départ :</label>
                    <input
                        type="date"
                        id="departureDate"
                                value={bookingDates.start == null ? "" : jsDateToHtmlDate(bookingDates.start)}
                                onChange={e => setBookingDates(dates => ({ start: e.target.valueAsDate, end: dates.end }))}
                    />
                </div>

                <div className='displayModulable'>
                    <label htmlFor="date_end">Arrivée :</label>
                    <input
                        type="date"
                        id="arrivalDate"
                                value={bookingDates.end == null ? "" : jsDateToHtmlDate(bookingDates.end)}
                                onChange={e => setBookingDates(dates => ({ start: dates.start, end: e.target.valueAsDate }))}
                    />
                </div>
            </div>

            <NavLink to="/recherche">
                <button onClick={searchFiltre} id='btnSearch'>Louez votre paradis </button>
            </NavLink>
        </div>
    );
};
