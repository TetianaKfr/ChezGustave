import React from 'react';
import './Search.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { Searchbar } from '../../components/SearchBar/Searchbar';
import { Footer } from '../../components/Footer/Footer';
import { CardDetails } from '../../components/CardDetails/CardDetails';
import { useState } from 'react';
import { useEffect } from 'react';

export const Search = ({ housings }) => {
    const [sliderValue, setSliderValue] = useState(0);
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);

    const handleSliderChange = (e) => {
        setSliderValue(parseInt(e.target.value));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:3630/categories", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    console.error("Error categories");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        const fetchTypes = async () => {
            try {
                const response = await fetch("http://localhost:3630/types", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                   
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTypes(data);
                } else {
                    console.error("Error types");
                }
            } catch (error) {
                console.error("Error :", error);
            }
        };

        fetchCategories();
        fetchTypes();
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
                        <input type="range" min="0" max="5000" className="PB-range-slider" id="myRange" value={sliderValue} onChange={handleSliderChange} />
                    </div>

                    <div>
                        <h4>Catégories:</h4>
                        {categories.map((category, i) => (
                            <div className='row' key={i}>
                                <input type="checkbox" name={'categorie' + i} value={category.id} />
                                <p>{category}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4>Type:</h4>
                        {types.map((type, index) => (
                            <div className='row' key={index}>
                                <input type="checkbox" name={'type' + index} value={type.id} />
                                <p>{type}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='card'>
                    {housings.map((housing, index) => (
                        <CardDetails key={housing.area} housing={housing} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}
