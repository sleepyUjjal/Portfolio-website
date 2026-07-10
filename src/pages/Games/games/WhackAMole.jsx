import React, { useState, useEffect, useRef, useCallback } from 'react';

const HOLES = 9;
const GAME_DURATION = 30; // seconds

const WhackAMole = ({ onBack }) => {
  const [moles, setMoles] = useState(Array(HOLES).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const moleTimerRef = useRef(null);
  const gameTimerRef = useRef(null);

  const showMole = useCallback(() => {
    const newMoles = Array(HOLES).fill(false);
    // Show 1-2 moles at a time
    const count = Math.random() > 0.6 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      newMoles[Math.floor(Math.random() * HOLES)] = true;
    }
    setMoles(newMoles);
  }, []);

  useEffect(() => {
    if (started && !gameOver) {
      // Speed up mole appearances as time decreases
      const speed = timeLeft > 20 ? 900 : timeLeft > 10 ? 700 : 500;
      moleTimerRef.current = setInterval(showMole, speed);
      gameTimerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setGameOver(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);

      return () => {
        clearInterval(moleTimerRef.current);
        clearInterval(gameTimerRef.current);
      };
    }
  }, [started, gameOver, showMole, timeLeft]);

  const whack = (i) => {
    if (!started || gameOver) return;
    if (moles[i]) {
      setScore(s => s + 1);
      setMoles(prev => {
        const next = [...prev];
        next[i] = false;
        return next;
      });
    }
  };

  const restart = () => {
    setMoles(Array(HOLES).fill(false));
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameOver(false);
    setStarted(true);
  };

  return (
    <div className="game-screen">
      <div className="game-screen__top-bar">
        <button className="game-screen__back" onClick={onBack}>← BACK</button>
        <span className="game-screen__score">SCORE: {score} | TIME: {timeLeft}s</span>
      </div>
      <h2 className="game-screen__title">
        <img src="/hammer.webp" alt="Whack A Mole" className="game-screen__title-icon" /> WHACK-A-MOLE
      </h2>

      <div className="wam-grid">
        {moles.map((isUp, i) => (
          <div
            key={i}
            className={`wam-hole ${isUp ? 'mole-up' : ''}`}
            onClick={() => whack(i)}
          >
            <div className="wam-mole">
              {isUp ? '🐹' : ''}
            </div>
            <div className="wam-dirt"></div>
          </div>
        ))}
      </div>

      {!started && !gameOver && (
        <div className="game-overlay" style={{ position: 'relative', marginTop: '2rem' }}>
          <p>Click the moles before they hide!</p>
          <button className="game-play-btn" onClick={() => setStarted(true)}>START GAME</button>
        </div>
      )}

      {gameOver && (
        <div className="game-overlay" style={{ position: 'relative', marginTop: '2rem' }}>
          <p>TIME'S UP!</p>
          <p>Final Score: {score}</p>
          <button className="game-play-btn" onClick={restart}>PLAY AGAIN</button>
        </div>
      )}
    </div>
  );
};

export default WhackAMole;
