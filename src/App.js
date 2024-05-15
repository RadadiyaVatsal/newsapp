import './App.css';

import React, { Component } from 'react'
import News from './components/News';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/business" element={<News category="business" key="business" />} />
            <Route path="/entertainment" element={<News category="entertainment" key="entertainment" />} />
            <Route path="/health" element={<News category="health" key="health"/>} />
            <Route path="/science" element={<News category="science"key="science" />} />
            <Route path="/sports" element={<News category="sports" key="sports"/>} />
            <Route path="/technology" element={<News category="technology" key="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
