import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import SnakeGame from './games/SnakeGame';
import MemoryGame from './games/MemoryGame';
import TicTacToe from './games/TicTacToe';
import WhackAMole from './games/WhackAMole';
import ReactionTimer from './games/ReactionTimer';
import './Games.css';

const GAMES_LIST = [
  {
    id: 'snake',
    title: 'Snake',
    image: '/snake.webp',
    tagline: 'Eat. Grow. Survive.',
    color: 'var(--color-red-wine',
    component: SnakeGame,
  },
  {
    id: 'memory',
    title: 'Memory Match',
    image: '/match.webp',
    tagline: 'Find matching pairs.',
    color: 'var(--color-orange-yellow)',
    component: MemoryGame,
  },
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    image: '/ttt.webp',
    tagline: 'Beat the unbeatable AI.',
    color: 'var(--color-nice-blue)',
    component: TicTacToe,
  },
  {
    id: 'whack',
    title: 'Whack-a-Mole',
    image: '/hammer.webp',
    tagline: 'Smash them all!',
    color: 'var(--color-curious-blue)',
    component: WhackAMole,
  },
  {
    id: 'reaction',
    title: 'Reaction Time',
    image: '/reaction.webp',
    tagline: 'Test your reflexes.',
    color: 'var(--color-raddish)',
    component: ReactionTimer,
  },
  {
    id: 'locked',
    title: '???',
    image: '/lock.webp',
    tagline: 'Coming Soon...',
    color: '#555',
    locked: true,
  },
];

const Games = () => {
  const [activeGame, setActiveGame] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => setActiveGame(null);

  // If a game is active, render the game component
  if (activeGame) {
    const GameComponent = activeGame.component;
    return (
      <section className="games-page">
        <div className="games-container">
          <GameComponent onBack={handleBack} />
        </div>
      </section>
    );
  }

  // Otherwise render the catalogue
  return (
    <section className="games-page">
      <div className="games-container">

        <div className="games-header">
          <h1 className="games-header__title">ARCADE</h1>
          <p className="games-header__subtitle">
            Select a game from the catalogue to play. All games run right here in your browser.
          </p>
        </div>

        <div className="games-catalogue">
          {GAMES_LIST.map((game) => (
            <div
              key={game.id}
              className={`game-card cursor-pointer ${game.locked ? 'game-card--locked' : ''}`}
              onClick={() => !game.locked && setActiveGame(game)}
              style={{ '--card-accent': game.color }}
            >
              <div className="game-card__glow"></div>
              <img src={game.image} alt={game.title} className="game-card__image" />
              <h3 className="game-card__title">{game.title}</h3>
              <p className="game-card__tagline">{game.tagline}</p>
              {game.locked ? (
                <div className="game-card__badge game-card__badge--locked">
                  <FaLock /> LOCKED
                </div>
              ) : (
                <div className="game-card__badge">
                  PLAY →
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Games;
