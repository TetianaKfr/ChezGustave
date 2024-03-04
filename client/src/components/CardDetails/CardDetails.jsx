import React from 'react';
import '../component.css';
import pictoVille from '../../assets/pictoVille.png'


export const CardDetails = () => {
    return (
        <>
            <div className='cardComplete'>
                <div className='CardDetails'>
                    <img className='photoLogement' src="" alt="photo du logement" />
                </div>
                <span className='UseForCSS'></span>
                <div className='textCard'>
                    <div className='row gap'>
                        <h2>Nom du logement</h2>
                        <div className='divPicto'>
                            <img src={pictoVille} alt="pictogramme ville" />
                            <p>ville</p>
                        </div>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ipsum ut deleniti. Ducimus, eos! Saepe laboriosam culpa recusandae repellat quasi illum deleniti. Iste nostrum mollitia assumenda beatae maioreipsum dolor sit amet consectetur adipisicing elit. Voluptatem ipsum ut deleniti. Ducimus, eos! Saepe laboriosam culpa recusandae repellat quasi illum deleniti. Iste nostrum mollitia assumenda beatae maiores temporibus voluptatum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ipsum ut deleniti. Ducimus, eos! Saepe laboriosam culpa recusandae repellat quasi illum deleniti. Iste nostrum mollitia assumenda beatae maiores temporibus voluptatum.</p>
                </div>
            </div>
        </>
    )
}