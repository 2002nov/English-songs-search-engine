import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "/Users/pawitapongpaew/Desktop/MusicMagnet/musicmagnet/src/navbar/navbar.js";
import "./search.css";
import searchicon from "/Users/pawitapongpaew/Desktop/MusicMagnet/musicmagnet/src/images/Searchicon.png";

const handleSearchQuery = (query) => {
    return {
        query: {
        bool: {
            should: [
            {
                multi_match: {
                query: query,
                fields: [
                    'songName',
                    'artist',
                    'lyrics'
                ],
                },
            },
            {
                wildcard: {
                songName: `*${query.toLowerCase()}*`,
                },
            },
            {
                wildcard: {
                artist: `*${query.toLowerCase()}*`,
                },
            },
            {
                wildcard: {
                title: `*${query.toLowerCase()}*`,
                },
            },
            ],
            minimum_should_match: 1,
        },
        },
        size: 100,
    }
    }

const QuerySearch = () => {
    const [loading, setLoading] = useState(false);
    let { query } = useParams();
    const [inputText, setInputText] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [Results, setResults] = useState([]);
    const [songClicked, setsongClicked] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);

    const handleSongSelect = (result) => {
    setSelectedResult(result);
    setsongClicked(true);
    };

    const renderNewBox = () => {
    if (selectedResult) {
        return (
        <div className="song">
            <img src={selectedResult["pic"]} className="pic2" alt="new" />
            <h2 className="SongName">
            {selectedResult["songName"]} ({selectedResult["year"]})
            </h2>
            <div className="genre">{selectedResult["genre"]}</div>
            <div className="Artist">{selectedResult["artist"]}</div>
            <div className="scroll_lyrics">
            <div>{selectedResult["lyrics"]}</div>
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

    useEffect(() => {
    if (query) {
        const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(
            "http://localhost:9200/finalmusicmagnet/_search",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(handleSearchQuery(query)),
            }
            );

            if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            const sourcesOnly = data.hits.hits.map((hit) => hit._source);

            setResults(sourcesOnly);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }
    }, [query]);

    const navigate = useNavigate()

    return (
    <div className="search-container">
        <Navbar transparent={true} />
        <img
        src={searchicon}
        type="button"
        className="Icon"
        alt="icon"
        id="clickable-box"
        onClick={() => navigate(`/search/${inputText}`)}
        />
        <div className="center-container">
        <input
            type="text"
            placeholder="What do you want to listen to?"
            className="search_box"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
        />
        </div>
        <div className={`default_format ${songClicked ? "clicked" : ""}`}>
        <div className="scroll_box">
            <h1>
            <span>
                {query}
                {Results.map((result) => (
                <div className="box" onClick={() => handleSongSelect(result)}>
                    <div class="grid-container">
                    <img src={result["pic"]} className="pic" alt="new" />
                    <div className="grid-item">{result["songName"]}</div>
                    <div className="grid-item">{result["artist"]}</div>
                    </div>
                </div>
                ))}
            </span>
            </h1>
        </div>
        {renderGoback()}
        </div>
        {renderNewBox()}
    </div>
    );
};

export default QuerySearch;
