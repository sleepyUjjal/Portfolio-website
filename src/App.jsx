import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Home from './pages/Home';
import Projects from './components/Projects/Projects';
import './App.css';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import About from './pages/About/About';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [isStarted, setIsStarted] = useState(() => {
    // Skip loading screen if we hard refresh on any page other than the landing page
    if (window.location.pathname !== '/') {
      return true;
    }
    return false;
  });

  return (
    <>
      <ScrollToTop />
      {/* Phase 3: Loading screen blocks everything until user clicks START */}
      {!isStarted && (
        <LoadingScreen onStart={() => setIsStarted(true)} />
      )}

      {/* Phase 4+: Main portfolio content (revealed after START) */}
      <div className="app-container" style={{ visibility: isStarted ? 'visible' : 'hidden' }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            {/* Placeholders for upcoming phases to prevent blank screens */}
            <Route path="/about" element={<About />} />
            <Route path="/games" element={<div style={{padding: '10rem', color: 'white', textAlign: 'center', fontFamily: 'BoldPixels'}}><h2>GAMES - PENDING PHASE 11</h2></div>} />
            <Route path="/contact" element={<div style={{padding: '10rem', color: 'white', textAlign: 'center', fontFamily: 'BoldPixels'}}><h2>CONTACT - PENDING PHASE 12</h2></div>} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;

