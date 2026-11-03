import React from 'react';
import portfolioData from '../../data/portfolio_data.json';
import './About.css';

const About = () => {
  const aboutData = portfolioData.about;
  const paragraphs = aboutData.bio.split('\n');

  return (
    <section className="about-page">
      <div className="about-content-wrapper">
        <div className="about-dialogue-box">
          
          <div className="dialogue-nameplate">
            {aboutData.name}
          </div>
          <div className="dialogue-title">
            &lt; {aboutData.title} &gt;
          </div>
          
          <div className="dialogue-text">
            {/* The photo floats to the right, allowing text to wrap around it */}
            <div className="about-photo-float">
              <div className="photo-frame">
                <img src="/photo.webp" alt={aboutData.name} className="profile-photo" />
              </div>
            </div>
            
            <p>
              {paragraphs.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < paragraphs.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
          
          {/* RPG Bouncing Cursor */}
          <div className="dialogue-cursor"></div>
          
          <a href="/resume.pdf" download className="about-resume-btn">
            DOWNLOAD RESUME ↓
          </a>
          
        </div>
      </div>
    </section>
  );
};

export default About;
