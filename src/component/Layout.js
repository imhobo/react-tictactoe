import React from 'react';
import Box from './Box';

function Layout({ boxes, onClick, winning, gameOver }) {
  return (
    <div className="board">
      {boxes.map((box, i) => (
        <Box
          key={i}
          value={box}
          onClick={() => onClick(i)}
          isWinning={winning && winning.includes(i)}
          gameOver={gameOver}
        />
      ))}
    </div>
  );
}

export default Layout;
