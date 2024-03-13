import React, { useState, useEffect } from 'react';
import './Search.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { Searchbar } from '../../components/SearchBar/Searchbar';
import { Footer } from '../../components/Footer/Footer';
import { CardDetails } from '../../components/CardDetails/CardDetails';

export const Search = ({ housings }) => {
    //valeur slider
    const [price_range_end, setPrice_range_end] = useState(0);
    //listes des categories (fetch)
    const [categories, setCategories] = useState([]);
    //listes des types (fetch)
    const [types, setTypes] = useState([]);
    //valeur checkbox filtre categorie
    const [selectedCategories, setSelectedCategories] = useState([]);
    //valeur checkbox filtre type
    const [selectedTypes, setSelectedTypes] = useState([]);


    const handleSliderChange = (e) => {
        setPrice_range_end(parseInt(e.target.value));
    };

    useEffect(() => {
        const fetchCategoriesAndTypes = async () => {
            try {
                const categoriesResponse = await fetch("http://localhost:3630/categories", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (categoriesResponse.ok) {
                    const categoriesData = await categoriesResponse.json();
                    setCategories(categoriesData);
                } else {
                    console.error("Error fetching categories:", categoriesResponse.statusText);
                }

                const typesResponse = await fetch("http://localhost:3630/types", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (typesResponse.ok) {
                    const typesData = await typesResponse.json();
                    setTypes(typesData);
                } else {
                    console.error("Error fetching types:", typesResponse.statusText);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchCategoriesAndTypes();
    }, []);


    return (
        <>
            <Navbar />
            <Searchbar selectedTypes={selectedTypes} selectedCategories={selectedCategories} price_range_end={price_range_end} />
            <div className='produitDescription'>
                <div className='filtre'>
                    <h3>Filtres</h3>
                    <p>Prix : {price_range_end} € max</p>
                    <div >
                        <input type="range" min="0" max="5000" className="PB-range-slider" id="myRange" value={price_range_end} onChange={handleSliderChange} />
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
                                <input type="checkbox" name={'type' + index} value={type.id} onChange={setSelectedTypes} />
                                <p>{type}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='card'>
                    {housings.map((housing, index) => (
                        <CardDetails key={housing.area} housing={housing} onChange={setSelectedCategories} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}
