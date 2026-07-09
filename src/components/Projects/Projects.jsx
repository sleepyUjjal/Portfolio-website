import React, { useRef } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import portfolioData from '../../data/portfolio_data.json';
import './Projects.css';

const PROJECTS = portfolioData.projects;

// Component to render a DVD case and a sliding disc
const ProjectDVD = ({ title, color }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0, rotate: -5 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      exit={{ y: -50, opacity: 0, rotate: 5 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        position: 'relative',
        width: '200px',
        height: '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* The DVD Disc */}
      <motion.div
        initial={{ x: 0, rotate: -90 }}
        animate={{ x: 120, rotate: 0 }}
        exit={{ x: 0, rotate: -90 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring', bounce: 0.4 }}
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: color,
          border: '4px solid var(--retro-dark)',
          zIndex: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.4)',
        }}
      >
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-wheat-field)',
          border: '4px solid var(--retro-dark)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'var(--retro-dark)',
            boxShadow: 'inset 2px 2px 0 rgba(0,0,0,0.5)'
          }} />
        </div>
        {/* DVD details/lines on the disc */}
        <div style={{
          position: 'absolute',
          top: '20px',
          width: '100%',
          textAlign: 'center',
          fontFamily: '"NeueBit", Courier, monospace',
          fontSize: '1.2rem',
          color: 'var(--retro-dark)',
          letterSpacing: '2px',
        }}>
          CD-ROM
        </div>
      </motion.div>

      {/* The DVD Case (Cover) */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--retro-dark)',
          border: `4px solid ${color}`,
          boxShadow: `8px 8px 0 rgba(0, 0, 0, 0.5)`,
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '12px',
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          border: `2px solid var(--color-wheat-field)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1rem',
          backgroundColor: 'var(--retro-dark)',
        }}>
          <span style={{
            fontFamily: '"NeueBit", Courier, monospace',
            fontSize: '1.4rem',
            color: 'var(--color-wheat-field)',
            textAlign: 'center',
            borderBottom: '2px solid var(--color-wheat-field)',
            paddingBottom: '0.5rem',
          }}>
            PROJECT
          </span>
          <span style={{
            fontFamily: '"BoldPixels", Courier, monospace',
            fontSize: '2.5rem',
            color: color,
            textAlign: 'center',
            wordBreak: 'break-word',
            textShadow: '3px 3px 0 rgba(0, 0, 0, 0.8)',
          }}>
            {title}
          </span>
          <span style={{
            fontFamily: '"NeueBit", Courier, monospace',
            fontSize: '1.2rem',
            color: 'var(--color-wheat-field)',
            textAlign: 'center',
          }}>
            v1.0
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const PROJECT_COLORS = [
  'var(--color-curious-blue)',
  'var(--color-blaze-orange)',
  'var(--color-nice-blue)',
  'var(--color-orange-yellow)',
  'var(--color-red-wine)',
  'var(--color-raddish)'
];

const ProjectCard = ({ project, index }) => {
  const navigate = useNavigate();
  // We can pick a color from the array
  const color = PROJECT_COLORS[index % PROJECT_COLORS.length];

  // Helper to format the title for the DVD cover
  const getCoverTitle = (title) => {
    // Remove anything in parentheses or brackets (like "(Freelance)")
    const cleanTitle = title.replace(/\s*[\(\[].*?[\)\]]/g, '').trim();
    const words = cleanTitle.split(' ');

    // If it's a long multi-word title like "Indian Hydraulic Works", use initials
    if (words.length >= 3) {
      return words.map(w => w[0]).join('').toUpperCase();
    }
    // If it's camelCase like "NullPass", split into two lines
    return cleanTitle.replace(/([a-z])([A-Z])/g, '$1\n$2');
  };

  // Variants for the spinning disc
  const discVariants = {
    rest: {
      x: 0,
      rotate: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
    hover: {
      x: 120,
      rotate: 360,
      transition: {
        x: { duration: 0.8, ease: 'easeOut' },
        rotate: { repeat: Infinity, duration: 3, ease: 'linear' }
      }
    }
  };

  return (
    <motion.div
      className="projects__card"
      style={{ borderColor: color }}
      onClick={() => navigate(`/project/${project.id}`)}
      whileHover="hover"
      initial="rest"
      animate="rest"
      whileTap={{ scale: 0.98 }}
    >
      {/* Top Left Accent */}
      <div className="projects__card-accent" style={{ borderTopColor: color, borderLeftColor: color }} />

      {/* Left: DVD Image */}
      <div className="projects__card-left">
        <div style={{
          position: 'relative',
          width: '200px',
          height: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* The DVD Disc */}
          <motion.div
            variants={discVariants}
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              backgroundColor: color,
              border: '4px solid var(--retro-dark)',
              zIndex: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-wheat-field)',
              border: '4px solid var(--retro-dark)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'var(--retro-dark)',
                boxShadow: 'inset 2px 2px 0 rgba(0,0,0,0.5)'
              }} />
              {/* Notch to make spin visible */}
              <div style={{
                position: 'absolute',
                top: 0,
                width: '4px',
                height: '12px',
                backgroundColor: 'var(--retro-dark)'
              }} />
            </div>
          </motion.div>

          {/* The DVD Case (Cover) */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--retro-dark)',
              border: `4px solid ${color}`,
              boxShadow: `8px 8px 0 rgba(0, 0, 0, 0.5)`,
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '12px',
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              border: `2px solid var(--color-wheat-field)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1rem',
              backgroundColor: 'var(--retro-dark)',
            }}>
              <span style={{
                fontFamily: '"NeueBit", Courier, monospace',
                fontSize: '1.4rem',
                color: 'var(--color-wheat-field)',
                textAlign: 'center',
                borderBottom: '2px solid var(--color-wheat-field)',
                paddingBottom: '0.5rem',
              }}>
                PROJECT
              </span>
              <span style={{
                fontFamily: '"BoldPixels", Courier, monospace',
                fontSize: '2.5rem',
                color: color,
                textAlign: 'center',
                wordBreak: 'break-word',
                textShadow: '3px 3px 0 rgba(0, 0, 0, 0.8)',
                whiteSpace: 'pre-line',
                lineHeight: '1.2'
              }}>
                {getCoverTitle(project.title)}
              </span>
              <span style={{
                fontFamily: '"NeueBit", Courier, monospace',
                fontSize: '1.2rem',
                color: 'var(--color-wheat-field)',
                textAlign: 'center',
              }}>
                v1.0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Description */}
      <div className="projects__card-right">
        <h2 className="projects__card-title" style={{ color: color }}>
          {project.title}
        </h2>

        <div className="projects__card-meta">
          <span>PROJECT_ID: {String(index + 1).padStart(2, '0')}</span>
          <span> // </span>
          <span>FILE: {project.id}.EXE</span>
        </div>

        <p className="projects__card-desc">
          {project.idea.substring(0, 180)}...
        </p>

        <div className="projects__card-footer">
          <div className="projects__card-tag" style={{ borderColor: color, color: color }}>
            VERIFIED_ARCHIVE
          </div>
          <div className="projects__card-link" style={{ color: color }}>
            VIEW_DETAILS &rarr;
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="projects">
      <div className="projects__list">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
