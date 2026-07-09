import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const BOOT_LINES = [
  '> BOOTING SYSTEM...',
  '> LOADING FONTS.........OK',
  '> CHECKING PIXELS.......OK',
  '> INITIALIZING PORTFOLIO.OK',
  '> ALL SYSTEMS GO',
];

const LoadingScreen = ({ onStart }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    // Type out boot lines one by one
    const lineTimer = setInterval(() => {
      setVisibleLines(prev => {
        const next = prev + 1;
        // Update progress bar proportionally
        setProgressWidth(Math.min((next / BOOT_LINES.length) * 100, 100));
        if (next >= BOOT_LINES.length) {
          clearInterval(lineTimer);
          // Small delay after last line before showing the button
          setTimeout(() => setBootComplete(true), 600);
        }
        return next;
      });
    }, 500);

    return () => clearInterval(lineTimer);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-screen__container">
        {/* Terminal Window */}
        <div className="loading-screen__terminal">
          <div className="terminal__titlebar">
            <span className="terminal__dot terminal__dot--red"></span>
            <span className="terminal__dot terminal__dot--yellow"></span>
            <span className="terminal__dot terminal__dot--green"></span>
            <span className="terminal__title">SYSTEM BOOT v1.0</span>
          </div>
          <div className="terminal__body">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <p key={i} className="terminal__line">{line}</p>
            ))}
            {visibleLines < BOOT_LINES.length && (
              <span className="terminal__cursor">█</span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="loading-screen__progress-wrapper">
          <div className="loading-screen__progress-track">
            <div
              className="loading-screen__progress-fill"
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
          <span className="loading-screen__progress-text">
            {Math.round(progressWidth)}%
          </span>
        </div>

        {/* Start Button — only after boot completes */}
        <div className="loading-screen__action">
          {bootComplete ? (
            <button className="loading-screen__start-btn" onClick={onStart}>
              PRESS START
            </button>
          ) : (
            <p className="loading-screen__wait">PLEASE WAIT...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
