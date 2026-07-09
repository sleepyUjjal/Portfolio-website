import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import Manifesto from '../components/Manifesto/Manifesto';

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
        gap: '2rem'
      }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{
            fontFamily: '"Mondwest", "Courier New", Courier, monospace',
            fontSize: '4rem',
            color: 'var(--color-wheat-field)',
            margin: 0,
            textShadow: '4px 4px 0 rgba(0, 0, 0, 0.4)'
          }}>
            SYSTEM_ARCHIVES.EXE
          </h2>
          <p style={{
            fontFamily: '"NeueBit", "Courier New", Courier, monospace',
            fontSize: '1.5rem',
            color: 'var(--color-curious-blue)',
            margin: 0,
            letterSpacing: '4px'
          }}>
            See almost all of my (actually decent) projects!
          </p>
        </div>
        <Link
          to="/projects"
          style={{
            fontFamily: '"BoldPixels", "Courier New", Courier, monospace',
            fontSize: '2rem',
            color: 'var(--retro-dark)',
            backgroundColor: 'var(--color-curious-blue)',
            textDecoration: 'none',
            padding: '1rem 2rem',
            border: '4px solid var(--color-curious-blue)',
            boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.4)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseOut={(e) => e.target.style.transform = 'none'}
        >
          VIEW PROJECTS
        </Link>
      </section>
    </>
  );
};

export default Home;
