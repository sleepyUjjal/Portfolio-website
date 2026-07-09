import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Home from './pages/Home';
import Projects from './components/Projects/Projects';
import './App.css';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';

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
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;

