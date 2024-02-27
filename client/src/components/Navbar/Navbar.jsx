import React from 'react';
import '../component.css';
import LogoGustave from '../../assets/LogoGustave.png';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <>
            <div className='navbar'>
                <NavLink to="/"><img id='Logo' src={LogoGustave} alt="logo site" /></NavLink>

                <div className='Boutons'>
                    <NavLink to="/"><button>Se connecter</button></NavLink>
                    <NavLink to="/"><button>S'inscrire</button></NavLink>
                </div>
            </div>
        </>
    )
}