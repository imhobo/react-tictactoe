import React from 'react';

function Box({ value, onClick, isWinning }) {
    return (
        <button
            className="box"
            style={isWinning ? { ...winningStyle } : style}
            onClick={onClick}>
            {value}
        </button>
    );
}

export default Box;

const style = {
    background: 'var(--box-bg, #fff)',
    border: '2px solid var(--box-border, lightblue)',
    fontSize: '30px',
    fontWeight: '800',
    cursor: 'pointer',
    outline: 'none',
    color: 'var(--text-color, #000)',
};

const winningStyle = {
    background: 'var(--box-bg, #fff)',
    border: '3px solid gold',
    fontSize: '30px',
    fontWeight: '800',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0 0 10px gold',
    color: 'var(--text-color, #000)',
};
