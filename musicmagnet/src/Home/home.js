import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/Users/pawitapongpaew/Documents/English-songs-search-engine-/musicmagnet/src/images/logo.png';
import './home.css';

function Home() {
  const navigate = useNavigate();

  const navigateToSearch = () => {
    navigate('/search');
  };

  return (
    <div className="home-container">
      <div className="center-content">
        <img src={logo} className="home-logo" alt="logo" />
        <button className="StartButton" onClick={navigateToSearch}>Start</button>
      </div>
    </div>
  );
}

export default Home;
