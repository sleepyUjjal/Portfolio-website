import React, { useState, useEffect, useRef, useCallback } from 'react';

const CELL_SIZE = 20;
const GRID_W = 20;
const GRID_H = 20;
const CANVAS_W = CELL_SIZE * GRID_W;
const CANVAS_H = CELL_SIZE * GRID_H;

const SnakeGame = ({ onBack }) => {
  const canvasRef = useRef(null);
  const dirRef = useRef({ x: 1, y: 0 });
  const snakeRef = useRef([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]);
  const foodRef = useRef({ x: 15, y: 10 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const gameLoopRef = useRef(null);

  const placeFood = useCallback(() => {
    let pos;
    do {
      pos = { x: Math.floor(Math.random() * GRID_W), y: Math.floor(Math.random() * GRID_H) };
    } while (snakeRef.current.some(s => s.x === pos.x && s.y === pos.y));
    foodRef.current = pos;
  }, []);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#1e1e24';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Grid lines
    ctx.strokeStyle = 'rgba(251, 183, 40, 0.08)';
    for (let i = 0; i <= GRID_W; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_H);
      ctx.stroke();
    }
    for (let i = 0; i <= GRID_H; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_W, i * CELL_SIZE);
      ctx.stroke();
    }

    // Food
    const f = foodRef.current;
    ctx.fillStyle = '#a1081e';
    ctx.fillRect(f.x * CELL_SIZE + 2, f.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(f.x * CELL_SIZE + 4, f.y * CELL_SIZE + 4, CELL_SIZE - 8, CELL_SIZE - 8);

    // Snake
    snakeRef.current.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#fbb728' : '#2c9fc7';
      ctx.fillRect(seg.x * CELL_SIZE + 1, seg.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      if (i === 0) {
        ctx.fillStyle = '#1e1e24';
        ctx.fillRect(seg.x * CELL_SIZE + 4, seg.y * CELL_SIZE + 4, 4, 4);
        ctx.fillRect(seg.x * CELL_SIZE + CELL_SIZE - 8, seg.y * CELL_SIZE + 4, 4, 4);
      }
    });
  }, []);

  const tick = useCallback(() => {
    const snake = [...snakeRef.current];
    const head = { x: snake[0].x + dirRef.current.x, y: snake[0].y + dirRef.current.y };

    // Wall collision
    if (head.x < 0 || head.x >= GRID_W || head.y < 0 || head.y >= GRID_H) {
      setGameOver(true);
      return;
    }
    // Self collision
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      setGameOver(true);
      return;
    }

    snake.unshift(head);

    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      setScore(prev => prev + 10);
      placeFood();
    } else {
      snake.pop();
    }

    snakeRef.current = snake;
    draw();
  }, [draw, placeFood]);

  useEffect(() => {
    const handleKey = (e) => {
      const dir = dirRef.current;
      switch (e.key) {
        case 'ArrowUp': if (dir.y !== 1) { dirRef.current = { x: 0, y: -1 }; } break;
        case 'ArrowDown': if (dir.y !== -1) { dirRef.current = { x: 0, y: 1 }; } break;
        case 'ArrowLeft': if (dir.x !== 1) { dirRef.current = { x: -1, y: 0 }; } break;
        case 'ArrowRight': if (dir.x !== -1) { dirRef.current = { x: 1, y: 0 }; } break;
        default: break;
      }
      e.preventDefault();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (started && !gameOver) {
      gameLoopRef.current = setInterval(tick, 120);
      return () => clearInterval(gameLoopRef.current);
    }
  }, [started, gameOver, tick]);

  useEffect(() => { draw(); }, [draw]);

  const restart = () => {
    snakeRef.current = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    dirRef.current = { x: 1, y: 0 };
    placeFood();
    setScore(0);
    setGameOver(false);
    setStarted(true);
  };

  return (
    <div className="game-screen">
      <div className="game-screen__top-bar">
        <button className="game-screen__back" onClick={onBack}>← BACK</button>
        <span className="game-screen__score">SCORE: {score}</span>
      </div>
      <h2 className="game-screen__title">
        <img src="/snake.webp" alt="Snake" className="game-screen__title-icon" /> SNAKE
      </h2>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="game-canvas"
        tabIndex={0}
      />
      {!started && !gameOver && (
        <div className="game-overlay">
          <p>Use Arrow Keys to move</p>
          <button className="game-play-btn" onClick={() => setStarted(true)}>START GAME</button>
        </div>
      )}
      {gameOver && (
        <div className="game-overlay">
          <p>GAME OVER!</p>
          <p>Score: {score}</p>
          <button className="game-play-btn" onClick={restart}>PLAY AGAIN</button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
