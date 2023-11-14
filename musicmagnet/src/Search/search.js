import React, { useState, useEffect } from 'react';
import Navbar from '/Users/pawitapongpaew/Documents/English-songs-search-engine-/musicmagnet/src/navbar/navbar.js';
import './search.css';
import searchicon from '/Users/pawitapongpaew/Documents/English-songs-search-engine-/musicmagnet/src/images/Searchicon.png';

function Search() {
    const [inputText, setInputText] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const handleInputChange = (e) => {
        const newText = e.target.value;
        setInputText(newText);
        setShowWarning(false);
    };

    const handleIconClick = () => {
        if (inputText.trim() === '') {
            setShowWarning(true);
        } else {
            setIsClicked(true);
        }
    };

    const handleGoBackClick = () => {
        window.location.reload(); 
    };

    const renderNewBox = () => {
        if (isClicked) {
            return (
                <div className="song">
                    <h2>New Box</h2>
                    <p>This is the content of the new box.</p>
                </div>
            );
        }
        return null; 
    };

    const renderGoback = () => {
        if (isClicked) {
            return (
                <button className="goback" onClick={handleGoBackClick}>
                    TOP 100 RANK
                </button>
            );
        }
        return null; // Render nothing if the icon is not clicked
    };

    return (
        <div className="search-container">
            <Navbar transparent={true} />
            <img
                src={searchicon}
                className="Icon"
                alt="icon"
                id="clickable-box"
                onClick={handleIconClick}
            />
            <div className="center-container">
                <input
                    type="text"
                    placeholder="What do you want to listen to?"
                    className="search_box"
                    value={inputText}
                    onChange={handleInputChange}
                />
            </div>
            {showWarning && <p className="warning">Please enter some text in the search box.</p>}
            <div className={`default_format ${isClicked ? 'clicked' : ''}`}>
                <h2>{isClicked ? (inputText || '...') : 'TOP 100 RANK'}</h2>
                {renderGoback()}
            </div>
            {renderNewBox()}
        </div>
    );
}

export default Search;
