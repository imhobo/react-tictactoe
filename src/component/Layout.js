import React from 'react';
import Box from './Box';

function Layout({boxes, onClick, winning }) {
    return (
      <div style={style}>
        {boxes.map((box, i) => (
          <Box key={i} value={box} onClick={() => onClick(i)} isWinning={winning && winning.includes(i)} />
      ))}
      </div>
    );
}

export default Layout;

const style = {
  border: '4px solid var(--layout-border, lightblue)',
  borderRadius: '10px',
  width: '320px',
  height: '320px',
  margin: '0 auto',
  display: 'grid',
  gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)',
  backgroundColor: 'transparent',
};
