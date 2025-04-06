import React from 'react'
import './Hero.css';
import '../global.css';

import globesvg from '/globesvg.svg';

export default function Hero() {
  return (
    <>
        <div className='main-container'>
            <h1 className='main-title'>Formula 1</h1>
            <h2 className='subtitle'>Circuit List</h2>
            <img src={globesvg} alt="globe" className='globe' />
        </div>
    </>

    )
}
