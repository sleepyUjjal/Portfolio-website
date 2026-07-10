import React, { useState, useEffect, useRef } from 'react';

const EMOJIS = ['🚀', '⚡', '🔥', '🎮', '💎', '🎯', '🧩', '🌟'];
const createBoard = () => {
  const pairs = [...EMOJIS, ...EMOJIS];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
};

const MemoryGame = ({ onBack }) => {
  const [cards, setCards] = useState(createBoard);
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (started && matches < 8) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
      return () => clearInterval(timerRef.current);
    }
    if (matches === 8) {
      clearInterval(timerRef.current);
    }
  }, [started, matches]);

  const handleClick = (id) => {
    if (!started) setStarted(true);
    if (flipped.length === 2) return;
    if (cards[id].matched || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped;
      if (cards[a].emoji === cards[b].emoji) {
        setCards(prev => prev.map(c =>
          c.id === a || c.id === b ? { ...c, matched: true } : c
        ));
        setMatches(m => m + 1);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const restart = () => {
    setCards(createBoard());
    setFlipped([]);
    setMoves(0);
    setMatches(0);
    setTimer(0);
    setStarted(false);
    clearInterval(timerRef.current);
  };

  const isFlipped = (id) => flipped.includes(id) || cards[id].matched;

  return (
    <div className="game-screen">
      <div className="game-screen__top-bar">
        <button className="game-screen__back" onClick={onBack}>← BACK</button>
        <span className="game-screen__score">MOVES: {moves} | TIME: {timer}s</span>
      </div>
      <h2 className="game-screen__title">
        <img src="/match.webp" alt="Memory Match" className="game-screen__title-icon" /> MEMORY MATCH
      </h2>

      <div className="memory-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${isFlipped(card.id) ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => handleClick(card.id)}
          >
            <div className="memory-card__inner">
              <div className="memory-card__front">?</div>
              <div className="memory-card__back">{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>

      {matches === 8 && (
        <div className="game-overlay" style={{ position: 'relative', marginTop: '2rem' }}>
          <p>🎉 YOU WIN!</p>
          <p>Moves: {moves} | Time: {timer}s</p>
          <button className="game-play-btn" onClick={restart}>PLAY AGAIN</button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
