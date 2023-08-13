import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css';

function Logo(){
    return(
        <div className='ma4 mt0'>
            <Tilt className='Tilt shadow-4'>
                <div style={{width:'auto', padding:'10px'}}>
                    <img style={{maxWidth:'100%', height:'auto'}} src={brain} alt="logo" />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;