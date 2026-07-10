import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [score, setScore] = useState('000000');

  useEffect(() => {
    const randomScore = Math.floor(Math.random() * 100000);
    setScore(randomScore.toString().padStart(6, '0'));
  }, []);

  return (
    <section className="retro-hero">
      {/* Health bar — top left */}
      <div className="retro-hero__hearts">
        {[1, 2, 3, 4, 5].map((h) => (
          <div key={h} className="pixel-heart"></div>
        ))}
      </div>

      {/* Score — top right */}
      <div className="retro-hero__score">
        SCORE: {score}
      </div>

      {/* Main Hero Content */}
      <div className="retro-hero__content">
        <h1 className="retro-hero__title">
          <span className="title-level">Full Stack Developer</span>
          UJJALDEEP SINGH
        </h1>
        <p className="retro-hero__subtitle">
          Building systems, crafting designs, and surviving the final boss — deployment.
        </p>

        {/* Scroll hint inside the normal flex flow to prevent overlap */}
        <div className="retro-hero__scroll-hint">
          SCROLL DOWN
          <span>▼</span>
        </div>
      </div>

      {/* Pixel grid floor */}
      <div className="retro-hero__landscape"></div>
    </section>
  );
};

export default Hero;
