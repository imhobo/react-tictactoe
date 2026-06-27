import React from 'react';

function Box({ value, onClick, isWinning, gameOver }) {
  const isTaken = value !== null;
  const classNames = [
    'cell',
    isTaken ? 'taken' : '',
    gameOver && !isTaken ? 'game-over' : '',
    isWinning ? 'win-cell' : '',
    value === 'X' ? 'cell-x' : '',
    value === 'O' ? 'cell-o' : '',
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} onClick={onClick} disabled={gameOver}>
      {/* X and O are rendered via CSS pseudo-elements */}
    </button>
  );
}

export default Box;
