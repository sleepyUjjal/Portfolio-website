import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="retro-header pixel-border">
      <div className="retro-header__logo">
        <span>UJJAL</span>
        <span className="blink">_</span>
      </div>
      <nav className="retro-header__nav">
        <a href="#about" className="pixel-btn btn-about">ABOUT</a>
        <a href="#projects" className="pixel-btn btn-projects">PROJECTS</a>
        <a href="#games" className="pixel-btn btn-games">GAMES</a>
        <a href="#contact" className="pixel-btn btn-contact">CONTACT</a>
      </nav>
    </header>
  );
};

export default Header;
