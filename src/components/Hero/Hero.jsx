import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="retro-hero">
      <div className="retro-hero__hearts">
        {[1, 2, 3, 4, 5].map((h) => (
          <div key={h} className="pixel-heart"></div>
        ))}
      </div>
      
      <div className="retro-hero__content">
        <h1 className="retro-hero__title">
          <span className="title-level">LEVEL 1</span>
          FULL STACK<br />DEVELOPER
        </h1>
        <p className="retro-hero__subtitle">
          Building systems, crafting designs, and surviving the final boss (deployment).
        </p>
      </div>

      <div className="retro-hero__landscape"></div>
    </section>
  );
};

export default Hero;
