// App.js

import React, { Component } from 'react';
import News from './components/News'; // Assuming News component is defined in './components/News.js'
import Navbar from './components/Navbar'; // Assuming Navbar component is defined in './components/Navbar.js'
import { HashRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router basename='newsapp'>
          <Navbar />
          <Routes>
            <Route path="/newsapp" element={<News />} />
            <Route path="/business" element={<News category="business" />} />
            <Route path="/entertainment" element={<News category="entertainment" />} />
            <Route path="/health" element={<News category="health" />} />
            <Route path="/science" element={<News category="science" />} />
            <Route path="/sports" element={<News category="sports" />} />
            <Route path="/technology" element={<News category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
