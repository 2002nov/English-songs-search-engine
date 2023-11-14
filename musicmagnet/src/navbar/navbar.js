import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/Users/pawitapongpaew/Documents/English-songs-search-engine-/musicmagnet/src/images/logo.png';
import './navbar.css'

function Navbar({ transparent }) {
    return (
        <div className={`navbar-container ${transparent ? 'transparent' : ''}`}>
            <nav>
            <Link to="/">
            <img src={logo} className="nav-logo" alt="logo" />
            </Link>
            <button className='discover'>DISCOVER</button>
            <button className='library'>MY LIBRARY</button>
            <button className='listener'>LISTENER</button>
            </nav>
        </div>
    );
}

export default Navbar;
