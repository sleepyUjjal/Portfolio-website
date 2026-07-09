import React, { useState } from 'react';
import Header from './components/Header/Header';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Hero from './components/Hero/Hero';
import Manifesto from './components/Manifesto/Manifesto';
import './App.css';

function App() {
  const [isStarted, setIsStarted] = useState(false);

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
          <Hero />
          <Manifesto />
          {/* Future phases (Projects, Arcade) will be added here */}
        </main>
      </div>
    </>
  );
}

export default App;

