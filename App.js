// // App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/home.js';
import Search from './Search/index.js';
import QuerySearch from './Search/[query].js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:query" element={<QuerySearch />} />
      </Routes>
    </Router>
  );
}

export default App;
