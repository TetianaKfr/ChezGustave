import React from 'react';
import './Navbar.css';
import LogoGustave from '../../assets/LogoGustave.png';

export const Navbar = () => {
    return (
        <>
            <div className='navbar'>
                <img id='Logo' src={LogoGustave} alt="logo site" />

                <div className='Boutons'>
                    <button>Se connecter</button>
                    <button>S'inscrire</button>
                </div>
            </div>
        </>
    )
}