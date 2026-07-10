import React, { useState } from 'react';

const TicTacToe = ({ onBack }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (b) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (const [a, bb, c] of lines) {
      if (b[a] && b[a] === b[bb] && b[a] === b[c]) return b[a];
    }
    if (b.every(cell => cell !== null)) return 'draw';
    return null;
  };

  const minimax = (b, depth, isMaximizing) => {
    const result = checkWinner(b);
    if (result === 'O') return 10 - depth;
    if (result === 'X') return depth - 10;
    if (result === 'draw') return 0;

    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!b[i]) {
          b[i] = 'O';
          best = Math.max(best, minimax(b, depth + 1, false));
          b[i] = null;
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!b[i]) {
          b[i] = 'X';
          best = Math.min(best, minimax(b, depth + 1, true));
          b[i] = null;
        }
      }
      return best;
    }
  };

  const aiMove = (b) => {
    let bestScore = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = 'O';
        const score = minimax(b, 0, false);
        b[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const handleClick = (i) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = 'X';

    const w = checkWinner(newBoard);
    if (w) {
      setBoard(newBoard);
      setWinner(w);
      return;
    }

    // AI moves
    const ai = aiMove([...newBoard]);
    if (ai !== -1) {
      newBoard[ai] = 'O';
    }

    const w2 = checkWinner(newBoard);
    setBoard(newBoard);
    if (w2) setWinner(w2);
  };

  const restart = () => {
    setBoard(Array(9).fill(null));
    setIsX(true);
    setWinner(null);
  };

  const getStatus = () => {
    if (winner === 'draw') return "IT'S A DRAW!";
    if (winner === 'X') return '🏆 YOU WIN!';
    if (winner === 'O') return '🤖 AI WINS!';
    return 'YOUR TURN (X)';
  };

  return (
    <div className="game-screen">
      <div className="game-screen__top-bar">
        <button className="game-screen__back" onClick={onBack}>← BACK</button>
        <span className="game-screen__score">{getStatus()}</span>
      </div>
      <h2 className="game-screen__title">
        <img src="/ttt.webp" alt="Tic Tac Toe" className="game-screen__title-icon" /> TIC TAC TOE
      </h2>

      <div className="ttt-grid">
        {board.map((cell, i) => (
          <button
            key={i}
            className={`ttt-cell ${cell === 'X' ? 'x' : ''} ${cell === 'O' ? 'o' : ''}`}
            onClick={() => handleClick(i)}
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <div className="game-overlay" style={{ position: 'relative', marginTop: '2rem' }}>
          <p>{getStatus()}</p>
          <button className="game-play-btn" onClick={restart}>PLAY AGAIN</button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
