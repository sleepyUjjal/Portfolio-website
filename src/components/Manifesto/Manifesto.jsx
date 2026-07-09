import React, { useRef } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import './Manifesto.css';

const MANIFESTO_POINTS = [
  {
    level: '01',
    title: 'BACKEND SYSTEMS',
    description: 'I design server architectures that don\'t crumble under pressure. APIs, databases, auth flows — the invisible infrastructure that holds everything together.',
    color: 'var(--color-nice-blue)',
  },
  {
    level: '02',
    title: 'FRONTEND CRAFT',
    description: 'Pixels matter. I build interfaces that feel alive — responsive, accessible, and satisfying to use. Every hover state, every transition is intentional.',
    color: 'var(--color-blaze-orange)',
  },
  {
    level: '03',
    title: 'DATA & STORAGE',
    description: 'From SQL schemas to cache layers, I architect data pipelines that are fast to query and safe to trust. Your data deserves better than a JSON file.',
    color: 'var(--color-curious-blue)',
  },
  {
    level: '04',
    title: 'USER EXPERIENCE',
    description: 'Good UX is invisible. I obsess over the tiny details — loading states, error messages, micro-interactions — that separate "works" from "feels great".',
    color: 'var(--color-orange-yellow)',
  },
  {
    level: '05',
    title: 'SHIP IT',
    description: 'CI/CD, Docker, deployment pipelines. I don\'t just build software — I put it in front of real users. The final boss is always production.',
    color: 'var(--color-red-wine)',
  },
];

const Manifesto = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress (0-1) to active index (0-4)
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, MANIFESTO_POINTS.length - 1]);

  const [currentIndex, setCurrentIndex] = React.useState(0);

  useMotionValueEvent(activeIndex, 'change', (latest) => {
    setCurrentIndex(Math.round(latest));
  });

  const currentPoint = MANIFESTO_POINTS[currentIndex];

  const handleDotClick = (index) => {
    if (containerRef.current) {
      const offsetTop = containerRef.current.offsetTop;
      const targetScrollY = offsetTop + index * window.innerHeight;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="manifesto">
      {/* Sticky viewport — this stays pinned while the user scrolls through the tall container */}
      <div className="manifesto__sticky">
        {/* Progress dots */}
        <div className="manifesto__progress">
          {MANIFESTO_POINTS.map((_, i) => (
            <div
              key={i}
              className={`manifesto__dot ${i === currentIndex ? 'manifesto__dot--active' : ''}`}
              style={{
                backgroundColor: i === currentIndex ? currentPoint.color : 'transparent',
                cursor: 'pointer'
              }}
              onClick={() => handleDotClick(i)}
            />
          ))}
        </div>

        {/* 3-Column Layout */}
        <div className="manifesto__layout">
          {/* Left: Level Number */}
          <div className="manifesto__left">
            <span className="manifesto__level-label">LEVEL</span>
            <span className="manifesto__level-number" style={{ color: currentPoint.color }}>
              {currentPoint.level}
            </span>
          </div>

          {/* Center: Pixel Art Placeholder */}
          <div className="manifesto__center">
            <div className="manifesto__canvas-placeholder" style={{ borderColor: currentPoint.color }}>
              <span className="manifesto__canvas-label">PIXEL ART</span>
              <span className="manifesto__canvas-sublabel">{currentPoint.title}</span>
            </div>
          </div>

          {/* Right: Description Text */}
          <div className="manifesto__right">
            <div className="manifesto__textbox" style={{ borderColor: currentPoint.color }}>
              <div className="manifesto__textbox-titlebar" style={{ backgroundColor: currentPoint.color }}>
                <span>{currentPoint.title}.TXT</span>
              </div>
              <div className="manifesto__textbox-body">
                <p>{currentPoint.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Current section indicator */}
        <div className="manifesto__footer">
          <span>{currentIndex + 1} / {MANIFESTO_POINTS.length}</span>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
