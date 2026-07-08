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
        <a href="#about">ABOUT</a>
        <a href="#projects">PROJECTS</a>
        <a href="#games">GAMES</a>
        <a href="#contact" className="pixel-btn">CONTACT</a>
      </nav>
    </header>
  );
};

export default Header;
