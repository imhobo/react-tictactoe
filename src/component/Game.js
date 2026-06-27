import React, { useState, useEffect, useRef, useCallback } from 'react';
import { checkWinner, getWinningLine, getComputerMove } from './Logic';
import Layout from './Layout';

const STORAGE_KEY = 'tictactoe_scores';

const THEME_KEY = 'tictactoe_theme';

function loadTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'dark';
  } catch {
    return 'dark';
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch { /* noop */ }
}

function loadScores() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { X: 0, O: 0, draw: 0 };
  } catch {
    return { X: 0, O: 0, draw: 0 };
  }
}

function saveScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch { /* noop */ }
}

function Game({ onScoreUpdate }) {
  const [layout, setLayout] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('2player');
  const [turns, setTurns] = useState(0);
  const [computerThinking, setComputerThinking] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [scores, setScores] = useState(loadScores);
  const [history, setHistory] = useState([]); // stack of { layout, xIsNext, turns }
  const [theme, setTheme] = useState(loadTheme);
  const confettiId = useRef(0);

  const winner = checkWinner(layout);
  const winningLine = winner ? getWinningLine(layout) : [];
  const isDraw = !winner && turns === 9;
  const gameOver = winner || isDraw;
  const canUndo = mode === '2player' && history.length > 0 && !gameOver && !computerThinking;

  // ── Theme ──
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  // ── Confetti ──
  useEffect(() => {
    if (!gameOver) {
      setConfetti([]);
      return;
    }
    confettiId.current += 1;
    const id = confettiId.current;
    const colors = ['#4FC3F7', '#FF6B6B', '#FFD700', '#FF8A65', '#CE93D8', '#81C784', '#FFD54F'];
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: `${id}-${i}`,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 6,
      delay: Math.random() * 0.8,
      duration: Math.random() * 1.5 + 2,
      round: Math.random() > 0.5,
    }));
    setConfetti(pieces);
  }, [gameOver]);

  // ── Score tracking ──
  useEffect(() => {
    if (!gameOver) return;
    const key = winner || 'draw';
    if (key && scores[key] !== undefined) {
      const next = { ...scores, [key]: scores[key] + 1 };
      setScores(next);
      saveScores(next);
    }
    // Only fire once per game end
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  const resetGame = useCallback(() => {
    setLayout(Array(9).fill(null));
    setXIsNext(true);
    setTurns(0);
    setComputerThinking(false);
    setConfetti([]);
    setHistory([]);
  }, []);

  const handleModeChange = useCallback((newMode) => {
    setMode(newMode);
    resetGame();
  }, [resetGame]);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }, []);

  const handleClick = useCallback((i) => {
    if (winner || layout[i] || computerThinking || isDraw) return;

    // Save current state for undo
    setHistory(prev => [...prev, { layout: [...layout], xIsNext, turns }]);

    const next = [...layout];
    next[i] = xIsNext ? 'X' : 'O';
    setLayout(next);
    setXIsNext(!xIsNext);
    setTurns(t => t + 1);
  }, [winner, layout, computerThinking, isDraw, xIsNext, turns]);

  const handleUndo = useCallback(() => {
    if (history.length === 0 || gameOver || computerThinking) return;
    const prev = history[history.length - 1];
    setLayout(prev.layout);
    setXIsNext(prev.xIsNext);
    setTurns(prev.turns);
    setHistory(h => h.slice(0, -1));
  }, [history, gameOver, computerThinking]);

  // ── Computer turn ──
  useEffect(() => {
    if (
      mode !== '1player' ||
      xIsNext ||
      winner ||
      isDraw ||
      computerThinking
    ) return;

    setComputerThinking(true);
    const timer = setTimeout(() => {
      const move = getComputerMove([...layout]);
      if (move !== null) {
        setHistory(prev => [...prev, { layout: [...layout], xIsNext, turns }]);
        const next = [...layout];
        next[move] = 'O';
        setLayout(next);
        setXIsNext(true);
        setTurns(t => t + 1);
      }
      setComputerThinking(false);
    }, 400);

    return () => { clearTimeout(timer); setComputerThinking(false); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, xIsNext, winner, isDraw, layout, turns]);

  // ── Status text ──
  let statusText = '';
  let statusClass = '';
  if (winner) {
    statusText = `🎉 ${winner} wins!`;
    statusClass = 'winner';
  } else if (isDraw) {
    statusText = "It's a draw!";
    statusClass = 'draw';
  } else if (computerThinking) {
    statusText = '🤔 Computer is thinking...';
    statusClass = 'thinking';
  } else {
    statusText = `${xIsNext ? 'X' : 'O'}'s turn`;
    statusClass = xIsNext ? 'next-x' : 'next-o';
  }

  return (
    <div className="app-container">
      {/* Confetti */}
      {confetti.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.round ? '50%' : 2,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Header */}
      <div className="header">
        <span className="header-icon">✦</span>
        <h1>Tic-Tac-Toe</h1>
      </div>

      {/* Theme toggle */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      {/* Scoreboard */}
      <div className="scoreboard">
        <div className="score-item x-score">
          <span className="label">X</span>
          <span className="value">{scores.X}</span>
        </div>
        <div className="score-divider" />
        <div className="score-item draw-score">
          <span className="label">Draw</span>
          <span className="value">{scores.draw}</span>
        </div>
        <div className="score-divider" />
        <div className="score-item o-score">
          <span className="label">O</span>
          <span className="value">{scores.O}</span>
        </div>
        <button
          className="score-reset"
          onClick={() => {
            const zero = { X: 0, O: 0, draw: 0 };
            setScores(zero);
            saveScores(zero);
          }}
          aria-label="Reset scores"
          title="Reset scores"
        >
          ↺
        </button>
      </div>

      {/* Mode Selector */}
      <div className="mode-selector">
        <button
          className={`mode-btn ${mode === '2player' ? 'active' : ''}`}
          onClick={() => handleModeChange('2player')}
        >
          👥 2 Player
        </button>
        <button
          className={`mode-btn ${mode === '1player' ? 'active' : ''}`}
          onClick={() => handleModeChange('1player')}
        >
          🤖 vs AI
        </button>
      </div>

      {/* Board */}
      <div className="board-wrapper">
        <Layout
          boxes={layout}
          onClick={handleClick}
          winning={winningLine}
          gameOver={gameOver}
        />
      </div>

      {/* Status */}
      <div className="status-area" key={turns}>
        <div className={`status-text ${statusClass}`}>{statusText}</div>
      </div>

      {/* Actions */}
      <div className="actions-row">
        {canUndo && (
          <button className="btn btn-undo" onClick={handleUndo}>
            ↩ Undo
          </button>
        )}
        {gameOver && (
          <button className="btn btn-play-again" onClick={resetGame}>
            Play Again
          </button>
        )}
      </div>

      {/* Move counter */}
      {!gameOver && turns > 0 && (
        <div className="move-counter">
          Move {turns} of 9
        </div>
      )}
    </div>
  );
}

export default Game;
