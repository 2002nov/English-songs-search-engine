import React, { useState, useEffect } from 'react';
import Navbar from '/Users/pawitapongpaew/Documents/English-songs-search-engine-/musicmagnet/src/navbar/navbar.js';
import './search.css';
import searchicon from '/Users/pawitapongpaew/Documents/English-songs-search-engine-/musicmagnet/src/images/Searchicon.png';

function Search() {
    const [inputText, setInputText] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    // const [ShowWarning, setShowWarning] = useState(false);
    const [songClicked, setsongClicked] = useState(false);

    const handleInputChange = (e) => {
        const newText = e.target.value;
        setInputText(newText);
        // setShowWarning(false);
    };

    const handleSongSelect = () => {
        setsongClicked(true);
        // setShowWarning(false);
    };

    const handleIconClick = () => {
        // if (inputText.trim() === '') {
        //     setShowWarning(true);
        // } else {
            setIsClicked(true);
        // }
    };

    const handleGoBackClick = () => {
        window.location.reload(); 
    };

    const renderNewBox = () => {
        if (songClicked) {
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
        if (songClicked) {
            return (
                <button className="goback" onClick={handleGoBackClick}>
                    TOP 100 RANK
                </button>
            );
        }
        if (isClicked) {
            return (
                <button className="back" onClick={handleGoBackClick}>
                    TOP 100 RANK
                </button>
            );
        }
        return null;
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
            {/* {ShowWarning && <p className="warning">Please enter some text in the search box.</p>} */}
            <div className={`default_format ${songClicked ? 'clicked' : ''}`}>
                <h2>{isClicked ? (inputText || 'Please enter some text in the search box.') : 'TOP 100 RANK'}</h2>
                <div className="scroll_box">
                    <div className="box" id="clickable-box" onClick={handleSongSelect}>1</div>
                    <div className="box">2</div>
                    <div className="box">3</div>
                    <div className="box">4</div>
                    <div className="box">5</div>
                    <div className="box">6</div>
                </div>
                {renderGoback()}
            </div>
            {renderNewBox()}
        </div>
    );
}

export default Search;
