import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import Manifesto from '../components/Manifesto/Manifesto';
import Skills from '../components/Skills/Skills';

const Home = () => {
  return (
    <>
      <Hero />
      <Manifesto />

      {/* View Projects CTA */}
      <section style={{
        minHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--retro-dark)',
        gap: '2rem',
        padding: '2rem 1.5rem' /* Add padding for mobile */
      }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '800px' }}>
          <h2 style={{
            fontFamily: '"Mondwest", "Courier New", Courier, monospace',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', /* Make font responsive */
            color: 'var(--color-wheat-field)',
            margin: 0,
            textShadow: '4px 4px 0 rgba(0, 0, 0, 0.4)',
            wordBreak: 'break-word',
            lineHeight: '1.1'
          }}>
            SYSTEM_ARCHIVES.EXE
          </h2>
          <p style={{
            fontFamily: '"NeueBit", "Courier New", Courier, monospace',
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', /* Make font responsive */
            color: 'var(--color-curious-blue)',
            margin: 0,
            letterSpacing: '2px', /* Reduce letter spacing for better fit on mobile */
            wordBreak: 'break-word'
          }}>
            See almost all of my (actually decent) projects!
          </p>
        </div>
        <Link
          to="/projects"
          style={{
            fontFamily: '"BoldPixels", "Courier New", Courier, monospace',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', /* Responsive button text */
            color: 'var(--retro-dark)',
            backgroundColor: 'var(--color-curious-blue)',
            textDecoration: 'none',
            padding: '1rem 2rem',
            border: '4px solid var(--color-curious-blue)',
            boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.4)',
            transition: 'transform 0.2s',
            textAlign: 'center',
            maxWidth: '100%'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseOut={(e) => e.target.style.transform = 'none'}
        >
          VIEW PROJECTS
        </Link>
      </section>
      <Skills />
    </>
  );
};

export default Home;
