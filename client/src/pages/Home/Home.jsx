import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Searchbar } from '../../components/SearchBar/Searchbar';
import { Footer } from '../../components/Footer/Footer';

export const Home = () => {
    return (
        <>
            <Navbar/>
            <Searchbar/>
            <Footer/>
        </>
    )
}