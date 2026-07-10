import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [crtMode, setCrtMode] = useState(false);

  useEffect(() => {
    if (crtMode) {
      document.body.classList.add('crt-mode');
    } else {
      document.body.classList.remove('crt-mode');
    }
  }, [crtMode]);

  return (
    <header className="retro-header pixel-border">
      <nav className="retro-header__nav">
        <Link to="/" className="pixel-btn btn-home">HOME</Link>
        <Link to="/about" className="pixel-btn btn-about">ABOUT</Link>
        <Link to="/projects" className="pixel-btn btn-projects">PROJECTS</Link>
        <Link to="/games" className="pixel-btn btn-games">GAMES</Link>
        <Link to="/contact" className="pixel-btn btn-contact">CONTACT</Link>
        {/* CRT Toggle Button */}
        <button 
          onClick={() => setCrtMode(!crtMode)} 
          className="pixel-btn btn-crt-toggle"
        >
          {crtMode ? 'CRT: ON' : 'CRT: OFF'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
