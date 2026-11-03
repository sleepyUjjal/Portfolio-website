import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [crtMode, setCrtMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (crtMode) {
      document.body.classList.add('crt-mode');
    } else {
      document.body.classList.remove('crt-mode');
    }
  }, [crtMode]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className="retro-header pixel-border">
      {/* Hamburger button — mobile only */}
      <button
        className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span className="hamburger__bar"></span>
        <span className="hamburger__bar"></span>
        <span className="hamburger__bar"></span>
      </button>

      <nav className={`retro-header__nav ${menuOpen ? 'nav--open' : ''}`}>
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

      {/* Overlay backdrop for mobile menu */}
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  );
};

export default Header;
