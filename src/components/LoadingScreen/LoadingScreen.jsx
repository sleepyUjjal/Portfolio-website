import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const BOOT_LINES = [
  '> BOOTING SYSTEM...',
  '> LOADING FONTS.........OK',
  '> CHECKING PIXELS.......OK',
  '> INITIALIZING PORTFOLIO.OK',
  '> FETCHING ASSETS.......',
];

const IMAGES_TO_PRELOAD = [
  '/photo.webp',
  '/char.webp',
  '/github.webp',
  '/linkedin.webp',
  '/mail.webp',
  '/res.webp',
  '/finprocessor_hld.webp',
  '/nuancenode_hld.webp',
  '/nullpass_hld.webp',
  '/tradingcli_hld.webp',
  '/veridian_hld.webp',
  '/hammer.webp',
  '/match.webp',
  '/reaction.webp',
  '/snake.webp',
  '/ttt.webp',
  '/lock.webp'
];

const LoadingScreen = ({ onStart }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [finalMessage, setFinalMessage] = useState('');

  // 1. Preload images
  useEffect(() => {
    let loadedCount = 0;
    const total = IMAGES_TO_PRELOAD.length;

    const preloadImages = async () => {
      const promises = IMAGES_TO_PRELOAD.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loadedCount++;
            // We can optionally use loadedCount to drive a real progress bar,
            // but for now we'll stick to the combined visual progress bar.
            resolve();
          };
          img.onerror = resolve; // Don't block on error
        });
      });
      
      // Also set a maximum timeout in case network is extremely slow
      const timeoutPromise = new Promise(resolve => setTimeout(resolve, 5000));
      await Promise.race([Promise.all(promises), timeoutPromise]);
      
      setAssetsLoaded(true);
    };
    
    preloadImages();
  }, []);

  // 2. Drive the boot sequence animation
  useEffect(() => {
    const lineTimer = setInterval(() => {
      setVisibleLines(prev => {
        const next = prev + 1;
        // Progress goes up to 80% with text, remaining 20% waits for assets
        setProgressWidth(Math.min((next / BOOT_LINES.length) * 80, 80));
        
        if (next >= BOOT_LINES.length) {
          clearInterval(lineTimer);
          setBootComplete(true);
        }
        return next;
      });
    }, 400);

    return () => clearInterval(lineTimer);
  }, []);

  // 3. Wait for both boot sequence and assets to finish
  const canStart = bootComplete && assetsLoaded;
  
  useEffect(() => {
    if (canStart) {
      setProgressWidth(100);
      setFinalMessage('> ALL SYSTEMS GO');
    }
  }, [canStart]);

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
              <p key={i} className="terminal__line">
                {line}
                {i === BOOT_LINES.length - 1 && canStart && 'OK'}
              </p>
            ))}
            {canStart && <p className="terminal__line">{finalMessage}</p>}
            
            {(!canStart || (canStart && finalMessage)) && (
              <span className="terminal__cursor">█</span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="loading-screen__progress-wrapper">
          <div className="loading-screen__progress-track">
            <div
              className="loading-screen__progress-fill"
              style={{ width: `${progressWidth}%`, transition: 'width 0.3s ease-out' }}
            ></div>
          </div>
          <span className="loading-screen__progress-text">
            {Math.round(progressWidth)}%
          </span>
        </div>

        {/* Start Button — only after everything completes */}
        <div className="loading-screen__action">
          {canStart ? (
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
