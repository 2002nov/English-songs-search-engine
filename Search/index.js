import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '/Users/pawitapongpaew/Desktop/MusicMagnet/musicmagnet/src/navbar/navbar.js';
import './search.css';
import { useNavigate } from 'react-router-dom'
import searchicon from '/Users/pawitapongpaew/Desktop/MusicMagnet/musicmagnet/src/images/Searchicon.png';

function Search() {

    const [inputText, setInputText] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [Results, setResults] = useState([]);
    const [songClicked, setsongClicked] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);

    // const handleInputChange = (e) => {
    //     const newText = e.target.value;
    //     setInputText(newText);
    // };

    const navigate = useNavigate()

    const handleButtonClick = async () => {
        try {
            navigate(`/search/${inputText}`)
        } catch (error) {
            console.error('Error fetching search results:', error.message);
        }
        setIsClicked(true);
    };

    const handleSongSelect = (result) => {
        setSelectedResult(result);
        setsongClicked(true);
    };

    const renderNewBox = () => {
        if (selectedResult) {
            return (
                <div className="song">
                    <img 
                    src={selectedResult['pic']}
                    className="pic2"
                    alt="new"
                    />
                    <h2 className="SongName">{selectedResult['song name']} ({selectedResult['year']})</h2>
                    <div className="genre">{selectedResult['genre']}</div>
                    <div className="Artist">{selectedResult['artist']}</div>
                    <div className="scroll_lyrics">
                        <div>{selectedResult['lyrics']}</div>
                    </div>
                </div>
            );
        }
        return null;
    };

    const handleGoBackClick = () => {
        window.location.reload(); 
    };
    
    const renderGoback = () => {
        if (songClicked) {
            return (
                <button className="goback" onClick={handleGoBackClick}>
                    TOP 3 RANK
                </button>
            );
        }
        if (isClicked) {
            return (
                <button className="back" onClick={handleGoBackClick}>
                    TOP 3 RANK
                </button>
            );
        }
        return null;
    };

    return (
        <div className="search-container">
            <Navbar transparent={true} />
            {/* <form onSubmit={handleFormSubmit}> */}
            {/* <button onClick={handleButtonClick}> */}
            <img
                src={searchicon}
                type="button"
                className="Icon"
                alt="icon"
                id="clickable-box"
                onClick={handleButtonClick}
            />
            {/* </button> */}
            <div className="center-container">
                <input
                    type="text"
                    placeholder="What do you want to listen to?"
                    className="search_box"
                    value={inputText}
                    // onChange={handleInputChange}
                    onChange={(e) => setInputText(e.target.value)}
                />
            </div>
            {/* </form> */}
            <div className={`default_format ${songClicked ? 'clicked' : ''}`}>
            <div className="scroll_box">
                <h1>  {isClicked
                ? (inputText || 'Please enter some text in the search box.')
                : (
                    <span>
                    TOP 3 RANK
                        <div className="box">
                            <div class="grid-container">
                                <img 
                                src="https://upload.wikimedia.org/wikipedia/th/4/44/%E0%B9%80%E0%B8%8A%E0%B8%9F%E0%B8%AD%E0%B8%AD%E0%B8%9F%E0%B8%A2%E0%B8%B9.png"
                                className="pic"
                                alt="new"
                                />
                                <div className="grid-item" style={{ fontSize: '16px' }}>Shape of You</div>
                                <div className="grid-item" style={{ fontSize: '16px' }}>Ed Sheeran</div>
                            </div>
                        </div>
                        <div className="box">
                            <div class="grid-container">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/en/a/ad/X_cover.png"
                                className="pic"
                                alt="new"
                                />
                                <div className="grid-item" style={{ fontSize: '16px' }}>Thinking Out Loud</div>
                                <div className="grid-item" style={{ fontSize: '16px' }}>Ed Sheeran</div>
                            </div>
                        </div>
                        <div className="box">
                            <div class="grid-container">
                                <img 
                                src="https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png"
                                className="pic"
                                alt="new"
                                />
                                <div className="grid-item" style={{ fontSize: '16px' }}>Shake It Off</div>
                                <div className="grid-item" style={{ fontSize: '16px' }}>Taylor Swift</div>
                            </div>
                        </div>
                    </span>
                )}
                </h1>  
                {/* {Results.map((result) => (
                    <div className="box" onClick={() => handleSongSelect(result)}>
                        <div class="grid-container">
                        <img 
                        src={result['pic']}
                        className="pic"
                        alt="new"
                        />
                            <div className="grid-item">{result['songName']}</div>
                            <div className="grid-item">{result['artist']}</div>
                        </div>
                    </div>
                ))} */}
                </div>
                {renderGoback()}
            </div>
            {renderNewBox()}
        </div>
    );
}

export default Search;