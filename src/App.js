import './App.css';
import React, { Component } from 'react';
import News from './components/News';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<News category="general" />} />
              <Route path="/business" element={<News category="business" />} />
              <Route path="/entertainment" element={<News category="entertainment" />} />
              <Route path="/health" element={<News category="health" />} />
              <Route path="/science" element={<News category="science" />} />
              <Route path="/sports" element={<News category="sports" />} />
              <Route path="/technology" element={<News category="technology" />} />
            </Routes>
          </ErrorBoundary>
        </Router>
      </div>
    );
  }
}
