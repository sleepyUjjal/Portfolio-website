import React, { useRef } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import './Manifesto.css';

const MANIFESTO_POINTS = [
  {
    level: '01',
    title: 'BACKEND',
    description: 'I (try to) architect backend systems built to scale. Crafting seamless APIs and rock-solid authentication to engineer the invisible foundation that applications rely on.',
    color: 'var(--color-curious-blue)',
    image: '/do.webp',
  },
  {
    level: '02',
    title: 'FRONTEND',
    description: 'Pixels matter just as much as the architecture. I build responsive, accessible interfaces that feel alive, ensuring every transition and hover state is as intentional as the infrastructure that powers it.',
    color: 'var(--color-blaze-orange)',
    image: '/snoop.webp',
  },
  {
    level: '03',
    title: 'DATA & STORAGE',
    description: 'Your data deserves better than a JSON file. From complex SQL schemas to optimized cache layers, I (try to) architect data pipelines that are lightning-fast to query and rock-solid to trust.',
    color: 'var(--color-nice-blue)',
    image: '/char.webp',
  },
  {
    level: '04',
    title: 'USER EXPERIENCE',
    description: 'Great UX is invisible. I obsess over the friction points. By perfecting loading states, edge cases, and micro interactions, I (generally) close the gap between \'it works\' and \'it feels great\'.',
    color: 'var(--color-orange-yellow)',
    image: '/tj.webp',
  },
  {
    level: '05',
    title: 'DEPLOYMENT',
    description: 'Code doesn\'t matter until it ships. I engineer reliable deployment pipelines using Docker and CI/CD to get software out of the editor and into the hands of real users. The final boss is always production, and I come prepared.',
    color: 'var(--color-red-wine)',
    image: '/offline.webp',
  },
];

// Unified, smooth image transition replacing the sliced effect for better performance and aesthetics
const ImageTransition = ({ src, alt }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ 
        duration: 0.15, 
        ease: "easeOut"
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        imageRendering: 'pixelated',
      }}
    />
  );
};

const Manifesto = () => {
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress (0-1) to active index (0-4)
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, MANIFESTO_POINTS.length - 1]);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [displayedImageIndex, setDisplayedImageIndex] = React.useState(0);

  useMotionValueEvent(activeIndex, 'change', (latest) => {
    const current = Math.round(latest);
    setCurrentIndex(current);
    setDisplayedImageIndex(current);
  });

  const currentPoint = MANIFESTO_POINTS[currentIndex];
  const displayedPoint = MANIFESTO_POINTS[displayedImageIndex];

  const handleDotClick = (index) => {
    if (containerRef.current) {
      const offsetTop = containerRef.current.offsetTop;
      const targetScrollY = offsetTop + index * window.innerHeight;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const canvasRef = React.useRef(null);
  
  // Align background grid to the canvas placeholder
  React.useEffect(() => {
    const updateBgPosition = () => {
      if (canvasRef.current && containerRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        // Calculate offset so the grid exactly aligns with the top-left of the canvas border
        const offsetX = rect.left % 64;
        const offsetY = rect.top % 64;
        // Apply offset globally so the Hero section grid can align with it
        document.documentElement.style.setProperty('--bg-offset-x', `${offsetX}px`);
        document.documentElement.style.setProperty('--bg-offset-y', `${offsetY}px`);
      }
    };
    
    updateBgPosition();
    window.addEventListener('resize', updateBgPosition);
    return () => window.removeEventListener('resize', updateBgPosition);
  }, []);

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
          <div className="manifesto__left" style={{ borderColor: currentPoint.color }}>
            <span className="manifesto__level-label">LEVEL</span>
            <span className="manifesto__level-number" style={{ color: currentPoint.color }}>
              {currentPoint.level}
            </span>
          </div>

          {/* Center: Pixel Art Placeholder */}
          <div className="manifesto__center">
            <div ref={canvasRef} className="manifesto__canvas-placeholder" style={{ borderColor: currentPoint.color, position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence>
                {displayedPoint && displayedPoint.image && (
                  <motion.div key={displayedImageIndex} style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    <ImageTransition src={displayedPoint.image} alt={displayedPoint.title} />
                  </motion.div>
                )}
              </AnimatePresence>
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
