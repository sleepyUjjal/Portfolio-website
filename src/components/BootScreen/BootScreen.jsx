import { useEffect, useState } from 'react';
import './BootScreen.css';

function BootScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after progress bar completes (2.5s)
    const fadeTimer = setTimeout(() => setFadeOut(true), 2800);
    // Fully remove after fade transition (0.6s)
    const completeTimer = setTimeout(() => onComplete(), 3400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`boot-screen ${fadeOut ? 'boot-screen--fade-out' : ''}`}>
      {/* Apple Logo */}
      <div className="boot-screen__logo">
        <span>&#63743;</span>
      </div>

      {/* Progress Bar */}
      <div className="boot-screen__progress">
        <div className="boot-screen__progress-fill"></div>
      </div>
    </div>
  );
}

export default BootScreen;
