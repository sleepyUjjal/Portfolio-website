import React from 'react';
import { Link } from 'react-router-dom';

import portfolioData from '../../data/portfolio_data.json';
import './Footer.css';

const Footer = () => {
  const { links } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="retro-footer">
      <div className="footer-container">

        {/* Top row: Nav + Socials */}
        <div className="footer-top">
          <div className="footer-nav">
            <Link to="/" className="footer-nav__link">HOME</Link>
            <Link to="/about" className="footer-nav__link">ABOUT</Link>
            <Link to="/projects" className="footer-nav__link">PROJECTS</Link>
            <Link to="/games" className="footer-nav__link">GAMES</Link>
            <Link to="/contact" className="footer-nav__link">CONTACT</Link>
          </div>

          <div className="footer-socials">
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="footer-social__link" aria-label="GitHub">
              <img src="/github.webp" alt="GitHub" className="footer-social__icon" />
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social__link" aria-label="LinkedIn">
              <img src="/linkedin.webp" alt="LinkedIn" className="footer-social__icon" />
            </a>
            <a href={`mailto:${links.email}`} className="footer-social__link" aria-label="Email">
              <img src="/mail.webp" alt="Email" className="footer-social__icon" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom row: Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} UJJALDEEP SINGH. ALL RIGHTS RESERVED.
          </p>
          <p className="footer-tagline">
            I just wanted to write something here :)
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
