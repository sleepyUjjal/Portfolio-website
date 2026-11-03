import React, { useState, useRef } from 'react';

const ReactionTimer = ({ onBack }) => {
  const [phase, setPhase] = useState('idle'); // idle, waiting, ready, result
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(null);

  const startGame = () => {
    setPhase('waiting');
    setReactionTime(null);
    const delay = 1500 + Math.random() * 4000; // 1.5s - 5.5s random delay
    timeoutRef.current = setTimeout(() => {
      setPhase('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (phase === 'idle' || phase === 'result') {
      startGame();
    } else if (phase === 'waiting') {
      // Clicked too early!
      clearTimeout(timeoutRef.current);
      setPhase('result');
      setReactionTime('TOO EARLY');
    } else if (phase === 'ready') {
      const elapsed = Date.now() - startTimeRef.current;
      setReactionTime(elapsed);
      setAttempts(prev => [...prev, elapsed]);
      if (!bestTime || elapsed < bestTime) {
        setBestTime(elapsed);
      }
      setPhase('result');
    }
  };

  const getColor = () => {
    switch (phase) {
      case 'waiting': return '#a1081e'; // Red - wait
      case 'ready': return '#2ecc40'; // Green - go!
      default: return '#1e1e24';
    }
  };

  const getMessage = () => {
    switch (phase) {
      case 'idle': return 'Click anywhere to start!';
      case 'waiting': return 'Wait for GREEN...';
      case 'ready': return 'CLICK NOW!';
      case 'result':
        if (reactionTime === 'TOO EARLY') return '😤 Too early! Click to try again.';
        return `⚡ ${reactionTime}ms! Click to try again.`;
      default: return '';
    }
  };

  const getRating = () => {
    if (typeof reactionTime !== 'number') return '';
    if (reactionTime < 200) return '🏆 SUPERHUMAN';
    if (reactionTime < 250) return '🔥 INCREDIBLE';
    if (reactionTime < 300) return '⚡ FAST';
    if (reactionTime < 400) return '👍 AVERAGE';
    return '🐢 SLOW';
  };

  const avg = attempts.length > 0 
    ? Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length) 
    : null;

  return (
    <div className="game-screen">
      <div className="game-screen__top-bar">
        <button className="game-screen__back" onClick={(e) => { e.stopPropagation(); onBack(); }}>← BACK</button>
        <span className="game-screen__score">
          BEST: {bestTime ? `${bestTime}ms` : '--'} | AVG: {avg ? `${avg}ms` : '--'}
        </span>
      </div>
      <h2 className="game-screen__title">
        <img src="/reaction.webp" alt="Reaction Time" className="game-screen__title-icon" /> REACTION TIME
      </h2>

      <div
        className="reaction-zone"
        onClick={handleClick}
        style={{ backgroundColor: getColor(), cursor: 'pointer' }}
      >
        <p className="reaction-msg">{getMessage()}</p>
        {phase === 'result' && typeof reactionTime === 'number' && (
          <p className="reaction-rating">{getRating()}</p>
        )}
      </div>

      {attempts.length > 0 && (
        <div className="reaction-history">
          {attempts.slice(-5).map((t, i) => (
            <span key={i} className="reaction-attempt">{t}ms</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReactionTimer;
