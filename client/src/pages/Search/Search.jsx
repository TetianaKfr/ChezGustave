import React, { useState, useEffect } from 'react';
import './Search.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { Searchbar } from '../../components/SearchBar/Searchbar';
import { Footer } from '../../components/Footer/Footer';
import { CardDetails } from '../../components/CardDetails/CardDetails';

export const Search = ({ housings }) => {
    // Valeur du slider
    const [price_range_end, setPrice_range_end] = useState(0);
    // Liste des catégories (fetch)
    const [categories, setCategories] = useState([]);
    // Liste des types (fetch)
    const [types, setTypes] = useState([]);
    // Valeur checkbox filtre catégorie
    const [selectedCategories, setSelectedCategories] = useState([]);
    // Valeur checkbox filtre type
    const [selectedTypes, setSelectedTypes] = useState([]);
    //recup le resultat de la recherche
    const [resultSearch, setResultSearch] = useState(undefined)

    //recuperer les catégories checked.
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        console.log(category)
        if (e.target.checked) {
            // stocker les resultats 
            setSelectedCategories([...selectedCategories, category]);
        } else {
            setSelectedCategories(selectedCategories.filter(id => id !== category));
        }
    };

    // Gestionnaire de changement pour les types
    const handleTypeChange = (e) => {
        // Récupération de l'identifiant du type depuis la valeur de la case à cocher
        const type = e.target.value;
        console.log(type);
        // Vérification si la case à cocher est cochée ou non
        if (e.target.checked) {
            // Si la case à cocher est cochée, ajouter le typeId à la liste des types sélectionnés
            setSelectedTypes([...selectedTypes, type]);
        } else {
            // Si la case à cocher est décochée, filtrer le typeId de la liste des types sélectionnés
            setSelectedTypes(selectedTypes.filter(id => id !== type));

        }
    };

    // Valeur slider, prix max
    const handleSliderChange = (e) => {
        setPrice_range_end(e.target.valueAsNumber);
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
                    setTypes(await typesResponse.json());
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
            <Searchbar
                housings={housings}
                selectedTypes={selectedTypes}
                selectedCategories={selectedCategories}
                price_range_end={price_range_end}
                setResultSearch={setResultSearch}
            />
            <div className='produitDescription'>
                <div className='filtre'>
                    <h3>Filtres</h3>
                    <p>Prix : {price_range_end} € max</p>
                    <div >
                        <input type="range" min="0" max="5000" className="PB-range-slider" id="myRange" value={price_range_end} onChange={handleSliderChange} />
                    </div>

                    <div>
                        <h4>Catégories:</h4>
                        {categories.map((category) => (
                            <div className='row' key={category}>
                                <input
                                    type="checkbox"
                                    name={category}
                                    value={category}
                                    onChange={handleCategoryChange}
                                    checked={undefined}
                                />
                                <p>{category}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4>Type:</h4>
                        {types.map(type => (
                            <div className='row' key={type}>
                                <input
                                    type="checkbox"
                                    name={type}
                                    value={type}
                                    onChange={handleTypeChange}
                                    checked={undefined}
                                />
                                <p> {type} </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='card'>
                    {
                        // Ajout de la fonction fleché pour permettre d'ecrire du JS dans le return html
                        (() => {
                            const housingList = resultSearch == undefined ? housings : resultSearch;
                            if (housingList.length == 0) {
                                return "Aucun resultat ne corresponds aux critères actuel";
                            } else {
                                return housingList.map((housing) => (
                                    <CardDetails
                                        key={housing.name}
                                        housing={housing}
                                    />
                                ));
                            }
                        })()
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}
